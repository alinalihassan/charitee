import {Model, model, Schema} from 'mongoose';
import {IProjectDocument} from './Documents';

const projectSchema: Schema = new Schema({
  active: {
    type: Boolean,
    required: true,
  },
  activities: {
    type: String,
  },
  additionalDocumentation: {
    type: String,
  },
  approvedDate: {
    type: Date,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
  },
  countries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
  ],
  dateOfMostRecentReport: {
    type: Date,
  },
  donationOptions: [
    {
      amount: {
        type: Number,
      },
      description: {
        type: String,
      },
    },
  ],
  funding: {
    type: Number,
  },
  goal: {
    type: Number,
  },
  images: [
    {
      url: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],
  longTermImpact: {
    type: String,
  },
  modifiedDate: {
    type: Date,
  },
  need: {
    type: String,
  },
  notice: {
    type: String,
  },
  numberOfDonations: {
    type: Number,
  },
  numberOfReports: {
    type: Number,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  progressReportLink: {
    type: String,
  },
  projectLink: {
    type: String,
  },
  remaining: {
    type: Number,
  },
  status: {
    type: String,
  },
  summary: {
    type: String,
  },
  themes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Theme',
    },
  ],
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  videos: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

const Project: Model<IProjectDocument> = model('Project', projectSchema);

export default Project;
