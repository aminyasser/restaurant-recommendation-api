import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserIdParamDto } from './user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get('recommendations/:userId')
  @ApiOperation({ summary: 'Recommended restaurants & users' })
  @ApiParam({ name: 'userId', description: 'Mongo ObjectId' })
  getForUser(@Param() { userId }: UserIdParamDto) {
    return this.service.recommend(userId);
  }
}
