//TODO
import {IsInt, IsNumber, IsString} from 'class-validator';
  
export class BearingDto {

    @IsString()
    company: string

    @IsString()
    Type: string

    @IsNumber()
    d: number

    @IsNumber()
    D: number

    @IsNumber()
    T: number

    @IsNumber()
    d1: number

    @IsNumber()
    B: number

    @IsNumber()
    C_m: number

    @IsNumber()
    r1: number

    @IsNumber()
    r2: number

    @IsNumber()
    r3: number

    @IsNumber()
    r4: number

    @IsNumber()
    a: number

    @IsNumber()
    C_k: number

    @IsNumber()
    C_o: number

    @IsNumber()
    e: number

    @IsNumber()
    Y: number

    @IsNumber()
    Y_o: number

}
