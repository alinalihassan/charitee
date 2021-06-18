import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isVerified: boolean;
}

export interface IUserCreate {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.set('toObject', {
  transform: function (doc: Document, ret: any) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const User: Model<IUser> = model("User", userSchema);

export default User;
