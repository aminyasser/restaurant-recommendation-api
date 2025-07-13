import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Burger King' })
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ example: 'برجر كنج' })
  @IsNotEmpty()
  nameAr: string;

  @ApiProperty({ example: 'burger-king-2' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug should be in kabab-case',
  })
  @MinLength(3)
  @MaxLength(20)
  slug: string;

  @ApiProperty({ example: ['burgers', 'american'], minItems: 1, maxItems: 3 })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  cuisines: string[];

  @ApiProperty({ example: 30.1149909 })
  @IsLongitude()
  lng: number;

  @ApiProperty({ example: 31.6057848 })
  @IsLatitude()
  lat: number;
}

export class QueryRestaurantsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return value;
  })
  cuisines?: string[];
}
