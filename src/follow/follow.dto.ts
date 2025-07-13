import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FollowRequestDto {
  @ApiProperty({ example: '6872b2bf8fd7a687b2609443' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ example: '6872b26a8fd7a687b260943d' })
  @IsMongoId()
  restaurantId: string;
}