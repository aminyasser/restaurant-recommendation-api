import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";


export interface RestaurantLocation {
    type: 'Point';
    coordinates: [number, number];
}


@Schema({ timestamps: true })
export class Restaurant {
    @Prop({ required: true })
    nameEn: string;

    @Prop({ required: true })
    nameAr: string;

    @Prop({ required: true, unique: true, index: true })
    slug: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Cuisine' }],
        validate: {
            validator: function (cuisines: Types.ObjectId[]) {
                return cuisines.length >= 1 && cuisines.length <= 3;
            },
            message: 'Restaurant must have between 1 and 3 cuisines'
        }
    })
    cuisines: Types.ObjectId[];

    @Prop({
        type: { type: String, default: 'Point', enum: ['Point'] },
        coordinates: { type: [Number], required: true },
    })
    location: RestaurantLocation;

}

export type RestaurantDocument = Restaurant & Document;

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ location: '2dsphere' });