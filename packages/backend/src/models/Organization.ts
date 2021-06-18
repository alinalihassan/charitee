import { Model, model, Schema } from "mongoose";
import { IOrganizationDocument } from "./Documents";

const organizationSchema: Schema = new Schema({
  activeProjects: {
    type: Number,
    required: true,
    default: 0
  },
  address: {
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String,
    },
    postcode: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country"
    }
  },
  ein: {
    type: String
  },
  logoUrl: {
    type: String
  },
  mission: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  provider: {
    type: String,
    required: true
  },
  totalProjects: {
    type: Number,
    required: true,
    default: 0
  },
  url: {
    type: String
  },
  themes: [{
    type: Schema.Types.ObjectId, ref: 'Theme'
  }]
});

function removeFields(obj: any) {
  for(var prop in obj) {
    if (prop === '_id' || prop === '__v')
      delete obj[prop];
    else if (typeof obj[prop] === 'object')
      removeFields(obj[prop]);
  }
}

organizationSchema.set('toObject', {
  transform: function (doc: Document, ret: any) {
    ret.id = ret._id
    removeFields(ret)
    // delete ret._id
    // delete ret.__v
  }
})

const Organization: Model<IOrganizationDocument> = model("Organization", organizationSchema);

export default Organization;
