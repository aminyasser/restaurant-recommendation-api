import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCuisineDto {
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
