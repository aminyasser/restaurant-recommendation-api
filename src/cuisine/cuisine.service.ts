import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cuisine, CuisineDocument } from './cuisine.schema';
import { CreateCuisineDto } from './cuisine.dto';

@Injectable()
export class CuisineService {
  constructor(
    @InjectModel(Cuisine.name)
    private readonly cuisineModel: Model<CuisineDocument>,
  ) {}

  async create(dto: CreateCuisineDto): Promise<Cuisine> {
    const exists = await this.cuisineModel.exists({ code: dto.code });
    if (exists) throw new ConflictException('Cuisine code already exists');
    return this.cuisineModel.create(dto);
  }

  list() {
    return this.cuisineModel.find().lean();
  }

  /**
   * Look up each cuisine code and tell the caller which ones
   * were found and which are missing.
   * return ids, in cas of missing throw error
   */
  async validateAndGetCuisineIds(codes: string[]): Promise<Types.ObjectId[]> {
    const cuisines = await this.cuisineModel
      .find({ code: { $in: codes } })
      .select('_id code')
      .lean();

    const map = new Map(cuisines.map((c) => [c.code, c._id as Types.ObjectId]));
    const result = { ids: [] as Types.ObjectId[], missing: [] as string[] };

    for (const code of codes) {
      const id = map.get(code);
      id ? result.ids.push(id) : result.missing.push(code);
    }

    if (result.missing.length) {
      throw new BadRequestException(
        `Unknown cuisine codes: ${result.missing.join(', ')}`,
      );
    }

    return result.ids;
  }
}
