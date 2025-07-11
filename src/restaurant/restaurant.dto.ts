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

export class CreateRestaurantDto {
  @IsNotEmpty()
  nameEn: string;

  @IsNotEmpty()
  nameAr: string;

  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug should be in kabab-case',
  })
  @MinLength(3)
  @MaxLength(20)
  slug: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  cuisines: string[];

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}

export class QueryRestaurantsDto {
  @IsOptional()
  @IsArray()
  @IsString({each: true})
   @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(item => item.trim()).filter(Boolean);
    }
    return value;
  })
  cuisines?: string[];
}
