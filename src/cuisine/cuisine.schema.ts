import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cuisine {
  @Prop({ required: true, unique: true, index: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export type CuisineDocument = Cuisine & Document;

export const CuisineSchema = SchemaFactory.createForClass(Cuisine);