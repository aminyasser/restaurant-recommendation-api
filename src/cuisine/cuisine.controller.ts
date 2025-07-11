import { Body, Controller, Get, Post } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CreateCuisineDto } from './cuisine.dto';

@Controller('cuisines')
export class CuisineController {
  constructor(private readonly service: CuisineService) {}

  @Post()
  create(@Body() dto: CreateCuisineDto) {
    return this.service.create(dto);
  }

  @Get()
  list() {
    return this.service.list();
  }
}
