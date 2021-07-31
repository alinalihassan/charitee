import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({ required: true })
  active: boolean;

  @Prop()
  activities: string;

  @Prop()
  additionalDocumentation: string;

  @Prop()
  approvedDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Country' })
  country: Country;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Country' }] })
  countries: Country[];

  @Prop()
  dateOfMostRecentReport: Date;

  @Prop(raw([{
    amount: { type: Number },
    description: { type: String }
  }]))
  donationOptions: Record<string, any>[];

  @Prop()
  funding: number;

  @Prop()
  goal: number;

  @Prop(raw([{
    url: { type: String },
    title: { type: String }
  }]))
  images: Record<string, any>[];

  @Prop()
  longTermImpact: string;

  @Prop()
  modifiedDate: Date;

  @Prop()
  need: string;

  @Prop()
  notice: string;

  @Prop()
  numberOfDonations: number;

  @Prop()
  numberOfReports: number;

  @Prop({ type: Types.ObjectId, ref: 'Organization' })
  organization: Organization;

  @Prop()
  progressReportLink: string;

  @Prop()
  projectLink: string;

  @Prop()
  remaining: number;

  @Prop()
  status: string;

  @Prop()
  summary: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Theme' }] })
  themes: Theme[];

  @Prop({ required: true })
  title: string;

  @Prop(raw([{
    url: { type: String, required: true }
  }]))
  videos: Record<string, any>[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
