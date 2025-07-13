import { Body, Controller, Get, Post } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CreateCuisineDto } from './cuisine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cuisines')
@Controller('cuisines')
export class CuisineController {
  constructor(private readonly service: CuisineService) {}

  @Post()
  @ApiOperation({ summary: 'add a cuisine' })
  create(@Body() dto: CreateCuisineDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'list all cuisines' })
  list() {
    return this.service.list();
  }
}
