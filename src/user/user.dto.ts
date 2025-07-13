import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Amin2' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: ['burgers', 'asian'], minItems: 1 })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  favoriteCuisines: string[];
}

export class UserIdParamDto {
  @ApiProperty({ example: '687410e42fc3ba2ba120824a' })
  @IsMongoId()
  userId!: string;
}
