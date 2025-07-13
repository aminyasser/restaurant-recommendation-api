import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserIdParamDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get('recommendations/:userId')
  getForUser(@Param() { userId }: UserIdParamDto) {
    return this.service.recommend(userId);
  }
}
