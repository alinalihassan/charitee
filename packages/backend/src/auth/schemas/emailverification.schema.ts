import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type EmailVerificationDocument = EmailVerification & Document;

@Schema()
export class EmailVerification {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false })
  __v: number;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  emailToken: string;

  @ApiProperty()
  @Prop({ required: true })
  timestamp: Date;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);
