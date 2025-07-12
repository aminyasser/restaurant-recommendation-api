import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
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
}
