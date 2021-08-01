import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type ForgottenPasswordDocument = ForgottenPassword & Document;

@Schema()
export class ForgottenPassword {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Number, select: false })
  __v: number;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  newPasswordToken: string;

  @ApiProperty()
  @Prop({ required: true })
  timestamp: Date;
}

export const ForgottenPasswordSchema =
  SchemaFactory.createForClass(ForgottenPassword);
