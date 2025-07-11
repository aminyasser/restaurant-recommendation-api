import { Module } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CuisineController } from './cuisine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cuisine, CuisineSchema } from './cuisine.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Cuisine.name, schema: CuisineSchema },
      ])
    ],
  providers: [CuisineService],
  controllers: [CuisineController],
  exports: [CuisineService]
})
export class CuisineModule {}
