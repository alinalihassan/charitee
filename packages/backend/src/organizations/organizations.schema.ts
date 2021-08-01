import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Theme } from 'src/themes/themes.schema';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false })
  __v: number;

  @ApiProperty({ default: 0 })
  @Prop({ required: true, default: 0 })
  activeProjects: number;

  @ApiProperty({ required: false })
  @Prop(
    raw({
      addressLine1: { type: String },
      addressLine2: { type: String },
      postcode: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: Types.ObjectId, ref: 'Country' },
    }),
  )
  address: Record<string, any>;

  @ApiProperty({ required: false })
  @Prop()
  ein: number;

  @ApiProperty({ required: false })
  @Prop()
  logoUrl: string;

  @ApiProperty({ required: false })
  @Prop()
  mission: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, unique: true })
  name: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  provider: number;

  @ApiProperty({ required: true })
  @Prop({ required: true, default: 0 })
  totalProjects: number;

  @ApiProperty({ required: false })
  @Prop()
  url: string;

  @ApiProperty({ required: false })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Theme' }] })
  themes: Theme[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
