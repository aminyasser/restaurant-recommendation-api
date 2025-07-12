import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  favoriteCuisines: string[];
}
