import { Model, model, Schema } from "mongoose";
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

const Country: Model<ICountryDocument> = model("Country", countrySchema);

export default Country;