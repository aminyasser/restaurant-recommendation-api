import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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

  @Get(':identifier')
  findOne(@Param('identifier') identifier: string) {
    return this.service.findOne(identifier);
  }
}
