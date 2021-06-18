import { Document, Model, model, Schema } from "mongoose";
import { IThemeDocument } from "./Documents";

const themeSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

themeSchema.set('toObject', {
  transform: function (doc: Document, ret: any) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Theme: Model<IThemeDocument> = model("Theme", themeSchema);

export default Theme;
