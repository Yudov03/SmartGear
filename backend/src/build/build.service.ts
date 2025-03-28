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
}
