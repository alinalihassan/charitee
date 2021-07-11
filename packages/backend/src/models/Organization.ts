import {Model, model, Schema} from 'mongoose';
import {IOrganizationDocument} from './Documents';

const organizationSchema: Schema = new Schema({
  activeProjects: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    postcode: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
  },
  ein: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  mission: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    required: true,
  },
  totalProjects: {
    type: Number,
    required: true,
    default: 0,
  },
  url: {
    type: String,
  },
  themes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Theme',
    },
  ],
});

const Organization: Model<IOrganizationDocument> = model(
  'Organization',
  organizationSchema
);

export default Organization;
