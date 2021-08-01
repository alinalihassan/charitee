import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Country } from 'src/countries/countries.schema';
import { Organization } from 'src/organizations/organizations.schema';
import { Theme } from 'src/themes/themes.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false})
  __v: number;

  @ApiProperty()
  @Prop({ required: true })
  active: boolean;

  @ApiProperty({ required: false })
  @Prop()
  activities: string;

  @ApiProperty({ required: false })
  @Prop()
  additionalDocumentation: string;

  @ApiProperty({ required: false })
  @Prop()
  approvedDate: Date;

  @ApiProperty({ required: false })
  @Prop({ type: Types.ObjectId, ref: 'Country' })
  country: Country;

  @ApiProperty({ required: false })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Country' }] })
  countries: Country[];

  @ApiProperty({ required: false })
  @Prop()
  dateOfMostRecentReport: Date;

  @ApiProperty({ required: false })
  @Prop(raw([{
    amount: { type: Number },
    description: { type: String }
  }]))
  donationOptions: Record<string, any>[];

  @ApiProperty({ required: false })
  @Prop()
  funding: number;

  @ApiProperty({ required: false })
  @Prop()
  goal: number;

  @ApiProperty({ required: false })
  @Prop(raw([{
    url: { type: String },
    title: { type: String }
  }]))
  images: Record<string, any>[];

  @ApiProperty({ required: false })
  @Prop()
  longTermImpact: string;

  @ApiProperty({ required: false })
  @Prop()
  modifiedDate: Date;

  @ApiProperty({ required: false })
  @Prop()
  need: string;

  @ApiProperty({ required: false })
  @Prop()
  notice: string;

  @ApiProperty({ required: false })
  @Prop()
  numberOfDonations: number;

  @ApiProperty({ required: false })
  @Prop()
  numberOfReports: number;

  @ApiProperty({ required: false })
  @Prop({ type: Types.ObjectId, ref: 'Organization' })
  organization: Organization;

  @ApiProperty({ required: false })
  @Prop()
  progressReportLink: string;

  @ApiProperty({ required: false })
  @Prop()
  projectLink: string;

  @ApiProperty({ required: false })
  @Prop()
  remaining: number;

  @ApiProperty({ required: false })
  @Prop()
  status: string;

  @ApiProperty({ required: false })
  @Prop()
  summary: string;

  @ApiProperty({ required: false })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Theme' }] })
  themes: Theme[];

  @ApiProperty({ required: true })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ required: false })
  @Prop(raw([{
    url: { type: String, required: true }
  }]))
  videos: Record<string, any>[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
