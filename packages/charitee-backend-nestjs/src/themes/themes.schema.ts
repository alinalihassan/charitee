import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ThemeDocument = Theme & Document;

@Schema()
export class Theme {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false})
  __v: number;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
