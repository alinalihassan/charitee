import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ collection: 'countries' })
export class Country {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false })
  __v: number;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  countryCode: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
