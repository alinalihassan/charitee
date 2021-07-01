export interface DefaultResponse {
  status: number;
  message: string;
}

export interface DataResponse<T> {
  status: number;
  data: T;
}

export interface ManyDataResponse<T> {
  status: number;
  count: number;
  nextPage?: number;
  data: T[];
}

export interface ErrorMsg {
  status: number;
  message: string;
  detail?: string
}

export interface IDonationOption {
  amount: number;
  description: string;
}

export interface IVideo {
  url: string;
}

export interface IImage {
  url: string;
  title: string;
}

export interface IAddress {
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  city: string;
  state: string;
  country: ICountry;
}

export interface ITheme {
  id: string;
  name: string;
}

export interface ICountry {
  name: string;
  countryCode: string;
}

export interface IOrganization {
  activeProjects: number;
  address: IAddress;
  ein: string;
  logoUrl: string;
  mission: string;
  name: string;
  provider: string;
  totalProjects: number;
  url: string;
  themes: Array<ITheme>;
}

export interface IProject {
  active: boolean;
  activities: string;
  additionalDocumentation: string;
  approvedDate: Date;
  country: ICountry;
  countries: Array<ICountry>;
  dateOfMostRecentReport: Date;
  donationOptions: Array<IDonationOption>;
  funding: number;
  goal: number;
  // imageGallerySize;
  // image;
  longTermImpact: string;
  modifiedDate: Date;
  need: string;
  numberOfDonations: number;
  numberOfReports: number;
  organization: IOrganization;
  progressReportLink: string;
  projectLink: string;
  remaining: number;
  status: string;
  summary: string;
  themes: Array<ITheme>;
  title: string;
  type: string;
  videos: Array<IVideo>;
}