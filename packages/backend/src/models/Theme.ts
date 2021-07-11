import {Model, model, Schema} from 'mongoose';
import {IThemeDocument} from './Documents';

const themeSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Theme: Model<IThemeDocument> = model('Theme', themeSchema);

export default Theme;
