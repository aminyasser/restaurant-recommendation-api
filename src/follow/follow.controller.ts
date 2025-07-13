import { Body, Controller, Delete, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowRequestDto } from './follow.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Follows')
@Controller('follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  follow(@Body() dto: FollowRequestDto) {
    return this.followService.follow(dto.userId, dto.restaurantId);
  }

  @Delete()
  unfollow(@Body() dto: FollowRequestDto) {
    return this.followService.unfollow(dto.userId, dto.restaurantId);
  }
}
