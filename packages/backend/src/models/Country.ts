import { Document, Model, model, Schema } from "mongoose";
import { ICountryDocument } from "./Documents";

const countrySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  countryCode: {
    type: String,
    required: true,
    unique: true
  }
});

countrySchema.set('toObject', {
  transform: function (doc: Document, ret: any) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Country: Model<ICountryDocument> = model("Country", countrySchema);

export default Country;