import {IsNotEmpty, IsInt} from 'class-validator';
  
export class EditProjectDto {
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