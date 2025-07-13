import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowDocument } from './follow.schema';
import { Model } from 'mongoose';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
  ) {}

  async follow(userId: string, restaurantId: string) {
    try {
      await this.followModel.create({ userId, restaurantId });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return {
      status: true,
      message: `userId ${userId} followed restaurant ${restaurantId} successfully`,
    };
  }

  async unfollow(userId: string, restaurantId: string) {
    try {
      await this.followModel.deleteOne({ userId, restaurantId });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return {
      status: true,
      message: `userId ${userId} unfollowed restaurant ${restaurantId} successfully`,
    };
  }
}
