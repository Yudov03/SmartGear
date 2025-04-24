import { ForbiddenException, Injectable } from '@nestjs/common';
import { BuildDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as math from 'mathjs';
import { Engine } from '@prisma/client';

@Injectable()
export class BuildService {
    constructor(private prisma: PrismaService) {}
    // Nhap vao P va n tinh ra P_ct va n_sb
    async calculateEngine(dto: BuildDto) {
        dto.P_ct = dto.P/(0.955*0.96*0.97*(0.99**3))
        dto.n_sb = dto.n*37.5
        const engines = await this.prisma.engine.findMany({
            where: {
                P_dc: {
                    gte: dto.P_ct
                }
            }
        })
        function loss_func(item: Engine, dto: BuildDto) {
            return math.abs(item.n_dc - dto.n_sb)/dto.n_sb
        }
        engines.sort((a, b) => loss_func(a, dto) - loss_func(b, dto))
        return [engines, dto]
    }
    // nhap vao dto tu output o tren va chon dong co return dto
    async transmissionRate(engineId: number, dto: BuildDto) {
        console.log(dto)
        const item = await this.prisma.engine.findFirst({
            where: {
                id: engineId,
            }
        })
        if (!item)
            throw new ForbiddenException('Access to resources denied');
        dto.P_real = item.P_dc
        dto.n_real = item.n_dc
        dto.u_d = 4
        let u_h = (dto.n_real/dto.n)/dto.u_d
        
        let a = 18.67393
        let b = Math.pow(u_h,2)
        let c = Math.pow(u_h,3)
        // Định nghĩa hàm và đạo hàm
        const f = (x: number): number => {
            return a * Math.pow(x, 4) - b * x - c;
        };

        const df = (x: number): number => {
            return 4 * a * Math.pow(x, 3) - b;
        };

        // Triển khai phương pháp Newton-Raphson
        const newtonRaphson = (
            f: (x: number) => number,
            df: (x: number) => number,
            x0: number,
            tol: number = 1e-8,
            maxIter: number = 100
        ): number => {
            let x = x0;
            for (let i = 0; i < maxIter; i++) {
                const fx = f(x);
                const dfx = df(x);
                
                if (Math.abs(fx) < tol) break;
                if (dfx === 0) throw new Error("Đạo hàm bằng 0 - Không thể tiếp tục");
                
                x = x - fx / dfx;
            }
            return x;
        };


        dto.u_brc=newtonRaphson(f,df,3)
        dto.u_brt= u_h / dto.u_brc

        dto.P_real=7.5 
        dto.P1=dto.P_real*0.99*0.95
        dto.P2=dto.P_real*0.99*0.96
        dto.P3=dto.P_real*0.99*0.955

        dto.n_real=2925
        dto.u_kn=1
        dto.n1=dto.n_real/dto.u_d
        dto.n2=dto.n1/dto.u_brc
        dto.n3=dto.n2/dto.u_brt
        dto.n=dto.n3/dto.u_kn

        let temp = 9.55 * Math.pow(10,6)

        dto.T_dc = temp*(dto.P_real/dto.n_real)
        dto.T1= temp * (dto.P1/dto.n1)
        dto.T2= temp *(dto.P2/dto.n2)
        dto.T3= temp *(dto.P3/dto.n3)
        dto.T_tt= dto.T3


        return dto
    }

    async duongkinhbanhdai (dto: BuildDto){
        dto.d1=160 
        dto.v1=(3.14*dto.d1*dto.n1)/60000
        let hesotruot=0.02
        let u=4
        dto.d2=dto.d1*u*(1-hesotruot)
        
        return dto
    }
    async khoangcachtruc(dto:BuildDto){
        let temp=0.96*dto.d2
        let h=8
        if (temp <= 2*(dto.d1+dto.d2)  && temp>=h+0.55*(dto.d1+dto.d2) )
            dto.a=temp
        dto.L = 2 * dto.a + (3.14 * (dto.d1 + dto.d2)) / 2 + Math.pow(dto.d2 - dto.d1, 2) / (4 * dto.a);
        let lambda = dto.L-3.14*(dto.d1+dto.d2)/2
        let delta = (dto.d2-dto.d1)/2
        let temp_2=Math.pow(lambda,2) - 8*Math.pow(delta,2)
        dto.a=(lambda+ Math.sqrt(temp_2) )/4
        let check_alpha_1 = (180 - 57)*((dto.d2-dto.d1)/dto.a)
        if (check_alpha_1 > 120) {
            dto.alpha_1 = check_alpha_1;
        }
    }

    async sodai(dto:BuildDto){
        let right = (7.5 * 1.2) / (4.059 * 0.872 * 1.081 * 1.14 * 0.9575);
        dto.z = Math.ceil(right);
    }

    async kichthuocbanhdai(dto:BuildDto){
        let t=15
        let e=10
        dto.B=(dto.z-1)*15+2*e
        let h0=3.3
        dto.d_a_1=dto.d1+2*h0
        dto.d_a_2=dto.d2+2*h0
    }

    async luctacdunglenbotruyen(dto:BuildDto){
        let F_v=63.049  
        let F_0= (1/dto.z )*((780*7.5*1.2)/24.504*0.872)+F_v
        dto.F_0_final=3 *F_0
        dto.P_real=7.5
        dto.F_t=1000*dto.P_real/24.504
        dto.F_r =2 *F_0*dto.z*Math.sin((dto.alpha_1*Math.PI)/(180*2))
        let z = dto.alpha_1*Math.PI/180
        dto.f= (1/z)* Math.log((2*dto.F_0_final+dto.F_t)/(2*dto.F_0_final-dto.F_t))
        return dto

    }

    
    async ungsuatmax(dto:BuildDto){
        dto.P_real=7.5
        let tmp=dto.alpha_1*Math.PI/180
        let phi_1= ((1000*dto.P_real)*Math.pow(Math.E,dto.f*tmp))/(24.504*3*81*(Math.pow(Math.E,dto.f*tmp)-1))
        let phi_v=1100*Math.pow(24.54,2)*Math.pow(10,-6)
        let phi_f_1=2*2.8*100/dto.d1
        dto.phi_max=phi_1+phi_v+phi_f_1
        dto.circle=9.8

        return dto

    }




}
