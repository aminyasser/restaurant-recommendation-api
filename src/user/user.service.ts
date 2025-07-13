import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { CuisineService } from 'src/cuisine/cuisine.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly cuisineService: CuisineService,
  ) {}

  async create(dto: CreateUserDto) {
    const cuisineIds = await this.cuisineService.validateAndGetCuisineIds(
      dto.favoriteCuisines,
    );
    return this.userModel.create({
      ...dto,
      favoriteCuisines: cuisineIds,
    });
  }

  async recommend(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const exists = await this.userModel.exists({ _id: userObjectId });
    if (!exists) throw new NotFoundException('User not found');

    const pipeline: PipelineStage[] = [
      { $match: { _id: userObjectId } },

      {
        $lookup: {
          from: 'users',
          let: {
            myId: '$_id',
            myCuisines: '$favoriteCuisines',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$_id', '$$myId'] },
                    {
                      $gt: [
                        {
                          $size: {
                            $setIntersection: [
                              '$favoriteCuisines',
                              '$$myCuisines',
                            ],
                          },
                        },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
            { $project: { _id: 1, name: 1 } },
          ],
          as: 'similarUsers',
        },
      },
      {
        $lookup: {
          from: 'follows',
          let: { similarUserIds: '$similarUsers._id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$userId', '$$similarUserIds'] },
              },
            },
            {
              $group: {
                _id: '$restaurantId',
                followerCount: { $sum: 1 },
              },
            },
            { $sort: { followerCount: -1 } },
          ],
          as: 'restaurantFollows',
        },
      },
      {
        $lookup: {
          from: 'restaurants',
          let: { restaurantIds: '$restaurantFollows._id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$restaurantIds'] },
              },
            },
            { $project: { nameEn: 1, slug: 1 } },
          ],
          as: 'restaurants',
        },
      },
      {
        $project: {
          similarUsers: 1,
          restaurants: {
            $map: {
              input: '$restaurantFollows',
              as: 'follow',
              in: {
                $mergeObjects: [
                  {
                    id: '$$follow._id',
                  },
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$restaurants',
                          cond: { $eq: ['$$this._id', '$$follow._id'] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          users: '$similarUsers',
          restaurants: {
            $map: {
              input: '$restaurants',
              in: {
                id: '$$this.id',
                nameEn: '$$this.nameEn',
                slug: '$$this.slug',
              },
            },
          },
        },
      },
    ];

    const [result] = await this.userModel
      .aggregate(pipeline)
      .allowDiskUse(true);

    return result || { users: [], restaurants: [] };
  }
}
