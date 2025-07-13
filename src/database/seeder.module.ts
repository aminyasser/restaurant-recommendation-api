import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cuisine, CuisineSchema } from 'src/cuisine/cuisine.schema';
import { Follow, FollowSchema } from 'src/follow/follow.schema';
import { Restaurant, RestaurantSchema } from 'src/restaurant/restaurant.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Cuisine.name, schema: CuisineSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: User.name, schema: UserSchema },
      { name: Follow.name, schema: FollowSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
