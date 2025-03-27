import {IsInt, IsNumber, IsString} from 'class-validator';
  
export class EngineDto {

    @IsString()
    company: string

    @IsString()
    Type: string

    @IsNumber()
    P_dc: number

    @IsInt()
    n_dc: number

    @IsString()
    Voltage: string

    @IsString()
    Current: string

    @IsNumber()
    Efficiency: number

    @IsNumber()
    Power_Fractor: number

    @IsNumber()
    Max_Torque_Ratio: number

    @IsNumber()
    Start_Torque_Ratio: number

    @IsNumber()
    Start_Current_Ratio: number

    @IsNumber()
    Weight: number

}