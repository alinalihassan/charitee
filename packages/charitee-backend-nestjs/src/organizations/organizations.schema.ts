import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Theme } from 'src/themes/themes.schema';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false})
  __v: number;

  @Prop({ required: true, default: 0 })
  activeProjects: number;

  @Prop(raw({
    addressLine1: { type: String },
    addressLine2: { type: String },
    postcode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: Types.ObjectId, ref: 'Country' }
  }))
  address: Record<string, any>;

  @Prop()
  ein: number;

  @Prop()
  logoUrl: string;

  @Prop()
  mission: string;

  @Prop({ required: true, unique: true })
  name: number;

  @Prop({required: true })
  provider: number;

  @Prop({ required: true, default: 0 })
  totalProjects: number;

  @Prop()
  url: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Theme' }] })
  themes: Theme[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
