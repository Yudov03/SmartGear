import { ForbiddenException, Injectable } from '@nestjs/common';
import { BuildDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as math from 'mathjs';
import { Engine } from '@prisma/client';

@Injectable()
export class BuildService {
    constructor(private prisma: PrismaService) {}
    
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

        // function solveQuartic(a: number, b: number, c: number, d: number, e: number): number[] {
        //     // Xử lý trường hợp đặc biệt khi a = 0 (trở thành phương trình bậc 3)
        //     if (a === 0) {
        //         return solveCubic(b, c, d, e);
        //     }
        
        //     // Chuẩn hóa phương trình về dạng x⁴ + px³ + qx² + rx + s = 0
        //     const p = b / a;
        //     const q = c / a;
        //     const r = d / a;
        //     const s = e / a;
        
        //     // Giải phương trình bậc 3 tương ứng
        //     const cubicRoots = solveCubic(1, -q, p * r - 4 * s, -p * p * s + 4 * q * s - r * r);
        
        //     // Chọn nghiệm thực dương đầu tiên
        //     const y = cubicRoots.find((root) => root > 0) || 0;
        //     console.log(y)
        //     // Tính các hệ số
        //     function calculateR(p: number, q: number, y: number): number {
        //         const underRoot = p * p / 4 - q + y; // Giá trị trong căn
                
        //         if (underRoot < 0) {
        //             throw new Error("Không thể tính căn bậc hai của số âm (R là phức).");
        //         }
                
        //         return math.sqrt(underRoot) as number; // Ép kiểu thành number
        //     }
        //     function calculateTemp(y: number, s: number): number {
        //         const underRoot = y * y - 4 * s; // Giá trị trong căn
                
        //         if (underRoot < 0) {
        //             throw new Error("Không thể tính căn bậc hai của số âm (temp là phức).");
        //         }
                
        //         return math.sqrt(underRoot) as number; // Ép kiểu thành number
        //     }
        //     function calculateD1(p: number, q: number, r: number, R: number): number {
        //         const underRoot = 3 * p * p / 4 - R * R - 2 * q + (4 * p * q - 8 * r - p * p * p) / (4 * R); // Giá trị trong căn
                
        //         if (underRoot < 0) {
        //             throw new Error("Không thể tính căn bậc hai của số âm (D là phức).");
        //         }
                
        //         return math.sqrt(underRoot) as number; // Ép kiểu thành number
        //     }
        //     function calculateE1(p: number, q: number, r: number, R: number): number {
        //         const underRoot = 3 * p * p / 4 - R * R - 2 * q - (4 * p * q - 8 * r - p * p * p) / (4 * R); // Giá trị trong căn
                
        //         if (underRoot < 0) {
        //             throw new Error("Không thể tính căn bậc hai của số âm (E là phức).");
        //         }
                
        //         return math.sqrt(underRoot) as number; // Ép kiểu thành number
        //     }
        //     function calculateD2(p: number, q: number, temp: number): number {
        //         const underRoot = 3 * p * p / 4 - 2 * q + 2 * temp; // Giá trị trong căn
                
        //         if (underRoot < 0) {
        //             throw new Error("Không thể tính căn bậc hai của số âm (D2 là phức).");
        //         }
                
        //         return math.sqrt(underRoot) as number; // Ép kiểu thành number
        //     }
        //     function calculateE2(p: number, q: number, temp: number): number {
        //         const underRoot = 3 * p * p / 4 - 2 * q - 2 * temp; // Giá trị trong căn
                
        //         if (underRoot < 0) {
        //             throw new Error("Không thể tính căn bậc hai của số âm (E2 là phức).");
        //         }
                
        //         return math.sqrt(underRoot) as number; // Ép kiểu thành number
        //     }
        //     // const R = math.sqrt(p * p / 4 - q + y);
        //     const R = calculateR(p,q,y)
        //     console.log(R)
        //     let D: number|math.Complex, E: number|math.Complex;
        
        //     if (R !== 0) {
        //         D = calculateD1(p,q,r,R);
        //         E = calculateE1(p,q,r,R);
        //     } else {
        //         const temp = calculateTemp(y,s)
        //         D = calculateD2(p,q,temp);
        //         E = calculateE2(p,q,temp);
        //     }
        //     // Tính các nghiệm
        //     const roots: number[] = [];
        
        //     if (R !== 0) {
        //         roots.push(-p / 4 + R / 2 + D / 2);
        //         roots.push(-p / 4 + R / 2 - D / 2);
        //         roots.push(-p / 4 - R / 2 + E / 2);
        //         roots.push(-p / 4 - R / 2 - E / 2);
        //     } else {
        //         roots.push(-p / 4 + D / 2);
        //         roots.push(-p / 4 - D / 2);
        //         roots.push(-p / 4 + E / 2);
        //         roots.push(-p / 4 - E / 2);
        //     }
        
        //     // Lọc bỏ các nghiệm NaN và trùng lặp
        //     const realRoots = roots.filter((root, index, self) => 
        //     !isNaN(root) && self.indexOf(root) === index
        //     );
        
        //     return realRoots;
        // }
        
        // function solveCubic(a: number, b: number, c: number, d: number) {
        //     let result = math.polynomialRoot(a,b,c,d)
        //     const ouput = result.filter(sol => {
        //         if (math.isComplex(sol)) return false; // Bỏ hẳn nếu là Complex
        //         return true; // Giữ lại nếu là number
        //     }) as number[];
        //     return ouput
        // }
        // const solutions = solveQuartic(14.03*(1.1**3),0,0,-(10.45**2),-(10.45**3))
        dto.u_brc = 2.97674693
        dto.u_brt = u_h/dto.u_brc
        dto.u_kn = 1
        
        dto.P1=dto.P_real*0.99*0.955
        dto.P2=dto.P1*0.99*0.96
        dto.P3=dto.P2*0.99*0.955

        dto.n1=dto.n_real/4
        dto.n2=dto.n1/dto.u_brc
        dto.n3=dto.n2/dto.u_brt

        dto.T_dc=9.55*(10**6)*dto.P_real/dto.n_real
        dto.T1=9.55*(10**6)*dto.P1/dto.n1
        dto.T2=9.55*(10**6)*dto.P2/dto.n2
        dto.T3=9.55*(10**6)*dto.P3/dto.n3
        dto.T_tt=9.55*(10**6)*dto.P3/dto.n

        return dto
    }
}
