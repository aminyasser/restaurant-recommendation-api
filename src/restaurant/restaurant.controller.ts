import {
  Body,
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, QueryRestaurantsDto } from './restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.service.create(createRestaurantDto);
  }

  @Get()
  list(@Query() query: QueryRestaurantsDto) {
    return this.service.findAll(query.cuisines);
  }

  @Get('nearby')
  nearby(
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('radius') radiusInKm?: string,
  ) {
    const radius = radiusInKm ? Number(radiusInKm) : 1000;
    return this.service.nearby(lng, lat, radius);
  }

  @Get(':identifier')
  findOne(@Param('identifier') identifier: string) {
    return this.service.findOne(identifier);
  }
}
