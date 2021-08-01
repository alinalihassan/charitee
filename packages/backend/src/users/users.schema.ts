import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Number, select: false })
  __v: number;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ required: false })
  @Prop()
  firstName: string;

  @ApiProperty({ required: false })
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty({ default: false })
  @Prop({ required: true, default: false })
  isVerified: boolean;

  @ApiProperty({ readOnly: true, default: Date.now() })
  @Prop({ required: true, default: Date.now() })
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
