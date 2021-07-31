import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ collection: 'countries' })
export class Country {
  @Prop({ type: Types.ObjectId })
  _id: string

  @Prop({ type: Number, select: false})
  __v: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  countryCode: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
