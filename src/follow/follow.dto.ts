import { IsMongoId } from 'class-validator';

export class FollowRequestDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  restaurantId: string;
}