import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCuisineDto {
  @ApiProperty({ example: 'koshari', description: 'kebab-case unique' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Koshari' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
