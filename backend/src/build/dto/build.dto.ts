import { Type } from 'class-transformer';
import {IsInt, IsNumber, IsOptional} from 'class-validator';
  
export class BuildDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    L: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n_sb: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    u_d: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    u_brc: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    u_brt: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    u_kn: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P_real: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P1: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P2: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P3: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P_ct: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n_real: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n1: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n2: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n3: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    T_dc: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    T1: number;
    
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    T2: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    T3: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    T_tt: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    d1: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    d2: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    v1: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    a: number;

   

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    alpha_1: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    z: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    B: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    d_a_1: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    d_a_2: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    F_0_final: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    F_t: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    F_r: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    f: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    phi_max: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    circle: number;

   

   
}