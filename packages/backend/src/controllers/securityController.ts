import User, { IUser, IUserCreate } from "../models/User";
import bcrypt from "bcryptjs";
import { jwtVerify } from 'jose/jwt/verify'
import { SignJWT } from 'jose/jwt/sign'
import Payload from "../types/Payload";
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { CustomError } from "../models/Error";
import { DataResponse, DefaultResponse, ErrorMsg } from "../models/Interfaces";
import { StatusCodes } from "http-status-codes";
import { secretKey, emailService } from "../util/config";

@Tags("Authentication")
@Route("auth")
export class AuthenticationController extends Controller {
  @Security("jwt")
  @Get("Test")
  public async test(@Request() request: any): Promise<string> {
    return "Success"
  }

  @SuccessResponse("201", "Created")
  @Response<ErrorMsg>(409, 'User already exists')
  @Post("register")
  public async register(
    @Body() userParams: IUserCreate
  ): Promise<DataResponse<string>> {
    this.setStatus(201)
    let email = userParams.email
    let password = userParams.password

    let user: IUser = await User.findOne({ email }).exec();

    if (user) {
      throw new CustomError({
        status: StatusCodes.CONFLICT,
        message: "User already exists"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const userFields = {
      email,
      password: hashed
    };

    user = new User(userFields);

    await user.save();

    const payload: Payload = {
      userId: user.id,

    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer(process.env.APP_NAME)
      .setExpirationTime('1h')
      .sign(secretKey);

    emailService.send_email(email, "Confirm Email", "activation", {
      URL: process.env.SERVER_HOST + "/api/auth/confirm-email?token=" + token,
    });

    return {status: StatusCodes.OK, data: token};
  }

  @Response<ErrorMsg>(401, 'Invalid Credentials')
  @Post("login")
  public async login(
    @Body() userParams: IUserCreate
  ): Promise<DataResponse<string>> {
    let email = userParams.email
    let password = userParams.password

    let user: IUser = await User.findOne({ email }).exec();

    if (!user) {
      throw new CustomError({
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid Credentials"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError({
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid Credentials"
      })
    }

    const payload: Payload = {
      userId: user.id
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer(process.env.APP_NAME)
      .setExpirationTime('1w')
      .sign(secretKey);

    return {status: StatusCodes.OK, data: token};
  }

  @Response<ErrorMsg>(StatusCodes.BAD_REQUEST, 'No token, unable to verify email')
  @Response<ErrorMsg>(StatusCodes.UNAUTHORIZED, 'Invalid Token')
  @Get("confirm-email")
  public async confirmEmail(
    @Query() token: string
  ): Promise<DefaultResponse> {
    // Check if no token
    if (!token) {
      throw new CustomError({
        status: StatusCodes.BAD_REQUEST,
        message: "No token, unable to verify email"
      })
    }

    // Verify token
    let userId: string 
    try {
      const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
        issuer: process.env.APP_NAME,
      });
      console.log(payload)
      console.log(protectedHeader)
      userId = payload.userId as string;
    } catch (err) {
      throw new CustomError({
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid Token"
      })
    }

    // TODO: Return a template to confirm
    const user: IUser = await User.findById(userId).select("-password").exec();
    user.isVerified = true;
    await user.save();

    return {status: StatusCodes.OK, message: "Email successfully confirmed"};
  }
}