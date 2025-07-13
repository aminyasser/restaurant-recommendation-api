import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  favoriteCuisines: string[];
}

export class UserIdParamDto {
  @IsMongoId()
  userId!: string;
}
