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
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a restaurant' })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.service.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'List restaurants with cuisines filter)' })
  @ApiQuery({ name: 'cuisines', required: false, example: 'burgers,asian' })
  list(@Query() query: QueryRestaurantsDto) {
    return this.service.findAll(query.cuisines);
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find restaurants within 1 Km (default) radius' })
  @ApiQuery({ name: 'lng', example: 30.11499 })
  @ApiQuery({ name: 'lat', example: 31.6057848 })
  @ApiQuery({ name: 'radius', required: false, example: 1000 })
  nearby(
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('radius') radiusInKm?: string,
  ) {
    const radius = radiusInKm ? Number(radiusInKm) : 1000;
    return this.service.nearby(lng, lat, radius);
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Get restaurant by _id or slug' })
  @ApiParam({ name: 'identifier', example: 'burger-king' })
  findOne(@Param('identifier') identifier: string) {
    return this.service.findOne(identifier);
  }
}
