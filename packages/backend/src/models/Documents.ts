import {Document} from 'mongoose';

export interface IDonationOptionDocument extends Document {
  amount: number;
  description: string;
}

export interface IVideoDocument extends Document {
  url: string;
}

export interface IImageDocument extends Document {
  url: string;
  title: string;
}

export interface IAddressDocument {
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  city: string;
  state: string;
  country: ICountryDocument;
}

export interface IThemeDocument extends Document {
  id: string;
  name: string;
}

export interface ICountryDocument extends Document {
  name: string;
  countryCode: string;
}

export interface IOrganizationDocument extends Document {
  activeProjects: number;
  address: IAddressDocument;
  ein: string;
  logoUrl: string;
  mission: string;
  name: string;
  provider: string;
  totalProjects: number;
  url: string;
  themes: Array<IThemeDocument>;
}

export interface IProjectDocument extends Document {
  active: boolean;
  activities: string;
  additionalDocumentation: string;
  approvedDate: Date;
  country: ICountryDocument;
  countries: Array<ICountryDocument>;
  dateOfMostRecentReport: Date;
  donationOptions: Array<IDonationOptionDocument>;
  funding: number;
  goal: number;
  // imageGallerySize;
  // image;
  longTermImpact: string;
  modifiedDate: Date;
  need: string;
  numberOfDonations: number;
  numberOfReports: number;
  organization: IOrganizationDocument;
  progressReportLink: string;
  projectLink: string;
  remaining: number;
  status: string;
  summary: string;
  themes: Array<IThemeDocument>;
  title: string;
  type: string;
  videos: Array<IVideoDocument>;
}
