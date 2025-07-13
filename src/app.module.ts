import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CuisineModule } from './cuisine/cuisine.module';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    RestaurantModule,
    CuisineModule,
    UserModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
