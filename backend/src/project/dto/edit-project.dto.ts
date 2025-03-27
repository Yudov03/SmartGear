import { Type } from 'class-transformer';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
  
export class EditProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

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
}