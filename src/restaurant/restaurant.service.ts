import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './restaurant.schema';
import { Model, Types } from 'mongoose';
import { CuisineService } from 'src/cuisine/cuisine.service';
import { CreateRestaurantDto } from './restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly cuisineService: CuisineService,
  ) {}

  async create(dto: CreateRestaurantDto) {
    const cuisineIds = await this.cuisineService.validateAndGetCuisineIds(
      dto.cuisines,
    );
    return this.restaurantModel.create({
      ...dto,
      cuisines: cuisineIds,
      location: { type: 'Point', coordinates: [dto.lng, dto.lat] },
    });
  }

  async findAll(cuisines?: string[]) {
    let filter = {};

    if (cuisines?.length) {
      const cuisineIds =
        await this.cuisineService.validateAndGetCuisineIds(cuisines);
      filter = { cuisines: { $in: cuisineIds } };
    }

    return this.restaurantModel
      .find(filter)
      .populate({ path: 'cuisines', model: 'Cuisine', select: 'code -_id' })
      .lean();
  }

  async findOne(identifier: string) {
    const filter = Types.ObjectId.isValid(identifier)
      ? { _id: identifier }
      : { slug: identifier };

    const doc = await this.restaurantModel
      .findOne(filter)
      .populate({ path: 'cuisines', model: 'Cuisine', select: 'code -_id' })
      .lean();

    if (!doc) throw new NotFoundException('Restaurant not found');
    return doc;
  }

  async nearby(lng: number, lat: number, radius = 1000) {
    return this.restaurantModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          maxDistance: radius,
          spherical: true,
          distanceField: 'distance',
        },
      },
      { $project: { _id: 1, nameEn: 1, slug: 1, distance: 1 } },
      { $sort: { distance: 1 } },
    ]);
  }
}
