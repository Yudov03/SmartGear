import { Type } from 'class-transformer';
import {IsNumber, IsOptional} from 'class-validator';
  
export class MlDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    P: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    n: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    L: number;
}