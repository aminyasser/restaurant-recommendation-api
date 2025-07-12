import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cuisine' }] })
  favoriteCuisines: Types.ObjectId[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
