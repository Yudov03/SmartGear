import {IsInt, IsNotEmpty} from 'class-validator';
  
export class CreateProjectDto {
    @IsInt()
    @IsNotEmpty()
    param1: number;

    @IsInt()
    @IsNotEmpty()
    param2: number;

    @IsInt()
    @IsNotEmpty()
    param3: number;
}