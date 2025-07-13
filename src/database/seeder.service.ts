import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cuisine, CuisineDocument } from '../cuisine/cuisine.schema';
import { Follow, FollowDocument } from '../follow/follow.schema';
import {
  Restaurant,
  RestaurantDocument,
} from '../restaurant/restaurant.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class SeederService {
  private readonly log = new Logger(SeederService.name);

  constructor(
    @InjectModel(Cuisine.name) 
    private cuisineModel: Model<CuisineDocument>,
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
    @InjectModel(Follow.name) 
    private followModel: Model<FollowDocument>,
  ) {}

  async seed() {
    if (await this.restaurantModel.countDocuments()) {
      this.log.warn('Seed aborted: data already present.');
      return;
    }

    const cuisines = await this.cuisineModel.insertMany([
      { _id: new Types.ObjectId(), code: 'burgers', name: 'Burgers' },
      { _id: new Types.ObjectId(), code: 'american', name: 'American' },
      { _id: new Types.ObjectId(), code: 'pizza', name: 'Pizza' },
      { _id: new Types.ObjectId(), code: 'italian', name: 'Italian' },
      { _id: new Types.ObjectId(), code: 'asian', name: 'Asian' },
      { _id: new Types.ObjectId(), code: 'chinese', name: 'Chinese' },
    ]);
    const idOf = (code: string) => cuisines.find((c) => c.code === code)!._id;

    const restaurants = await this.restaurantModel.insertMany([
      {
        _id: new Types.ObjectId(),
        nameAr: 'بافلو برجر',
        nameEn: 'Buffalo Burger',
        slug: 'buffalo-burger',
        cuisines: [idOf('burgers'), idOf('american')],
        location: { type: 'Point', coordinates: [30.1142583, 31.606554] },
      },
      {
        _id: new Types.ObjectId(),
        nameAr: 'بيتزا روما',
        nameEn: 'Pizza Roma',
        slug: 'pizza-roma',
        cuisines: [idOf('pizza'), idOf('italian')],
        location: { type: 'Point', coordinates: [30.114581, 31.6062278] },
      },
      {
        _id: new Types.ObjectId(),
        nameAr: 'برجر كنج',
        nameEn: 'Burger King',
        slug: 'burger-king',
        cuisines: [idOf('burgers')],
        location: { type: 'Point', coordinates: [30.1059819, 31.6261356] },
      },
      {
        _id: new Types.ObjectId(),
        nameAr: 'دومينوز بيتزا',
        nameEn: 'Domino’s Pizza',
        slug: 'dominos-pizza',
        cuisines: [idOf('pizza')],
        location: { type: 'Point', coordinates: [30.1055784, 31.6102185] },
      },
      {
        _id: new Types.ObjectId(),
        nameAr: 'موري سوشي',
        nameEn: 'Mori Sushi',
        slug: 'mori-sushi',
        cuisines: [idOf('asian')],
        location: { type: 'Point', coordinates: [30.1066047, 31.6259942] },
      },
      {
        _id: new Types.ObjectId(),
        nameAr: 'جارنيل سوشي',
        nameEn: 'Garnell Sushi',
        slug: 'garnell-sushi',
        cuisines: [idOf('asian')],
        location: { type: 'Point', coordinates: [30.1139099, 31.608866] },
      },
    ]);

    const users = await this.userModel.insertMany([
      {
        _id: new Types.ObjectId(),
        name: 'Amin',
        favoriteCuisines: [idOf('pizza')],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Hassan',
        favoriteCuisines: [idOf('burgers')],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Omar',
        favoriteCuisines: [idOf('burgers')],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Mohanad',
        favoriteCuisines: [idOf('asian')],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Khaled',
        favoriteCuisines: [idOf('chinese')],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Mohammed',
        favoriteCuisines: [idOf('pizza'), idOf('burgers')],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Youssef',
        favoriteCuisines: [idOf('pizza'), idOf('burgers'), idOf('asian')],
      },
    ]);

    const follows: Partial<FollowDocument>[] = [];
    const followsToInsert: Array<{
      userId: Types.ObjectId;
      restaurantId: Types.ObjectId;
    }> = [];

    users.forEach((user, userIndex) => {
      const total = restaurants.length;

      const firstRestaurantId = restaurants[userIndex % total]._id;
      const secondRestaurantId = restaurants[(userIndex + 1) % total]._id;
      const thirdRestaurantId = restaurants[(userIndex + 2) % total]._id;

      [firstRestaurantId, secondRestaurantId, thirdRestaurantId].forEach(
        (restaurantId) =>
          followsToInsert.push({
            userId: user._id as Types.ObjectId,
            restaurantId: restaurantId as Types.ObjectId,
          }),
      );
    });

    await this.followModel.insertMany(followsToInsert);

    this.log.log(
      `Seeded ${cuisines.length} cuisines, ` +
        `${restaurants.length} restaurants, ` +
        `${users.length} users, ` +
        `${follows.length} follows.`,
    );
  }
}
