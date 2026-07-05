import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  level: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
