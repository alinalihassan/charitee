import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailVerification } from './interfaces/emailverification.interface';
import { ForgottenPassword } from './interfaces/forgottenpassword.interface';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel('EmailVerification')
    private readonly emailVerificationModel: Model<EmailVerification>,
    @InjectModel('ForgottenPassword')
    private readonly forgottenPasswordModel: Model<ForgottenPassword>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const isMatch = await compare(password, user.password);

    if (!isMatch)
      throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async login(user: User) {
    const payload = { username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createEmailToken(email: string): Promise<void> {
    const emailVerification = await this.emailVerificationModel.findOne({
      email: email,
    });
    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new HttpException(
        'LOGIN.EMAIL_SENDED_RECENTLY',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      const payload = { username: email, time: new Date().getTime() };
      await this.emailVerificationModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          emailToken: this.jwtService.sign(payload),
          timestamp: new Date(),
        },
        { upsert: true },
      );
    }
  }

  async createForgottenPasswordToken(
    email: string,
  ): Promise<ForgottenPassword> {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({
      email: email,
    });
    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new HttpException(
        'RESET_PASSWORD.EMAIL_SENDED_RECENTLY',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      const payload = { username: email, time: new Date().getTime() };
      const forgottenPasswordModel =
        await this.forgottenPasswordModel.findOneAndUpdate(
          { email: email },
          {
            email: email,
            newPasswordToken: this.jwtService.sign(payload),
            timestamp: new Date(),
          },
          { upsert: true, new: true },
        );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException(
          'LOGIN.ERROR.GENERIC_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const emailVerif = await this.emailVerificationModel.findOne({
      emailToken: token,
    });
    if (emailVerif && emailVerif.email) {
      await this.usersService.confirmEmail(emailVerif.email);
      await emailVerif.remove();
    } else {
      throw new HttpException(
        'LOGIN.EMAIL_CODE_NOT_VALID',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getForgottenPasswordModel(
    newPasswordToken: string,
  ): Promise<ForgottenPassword> {
    return await this.forgottenPasswordModel.findOne({
      newPasswordToken: newPasswordToken,
    });
  }

  async sendEmailVerification(email: string): Promise<void> {
    const model = await this.emailVerificationModel.findOne({ email: email });

    if (model && model.emailToken) {
      this.emailService.sendEmail('activation', email, 'Verify Email', {
        URL: `${process.env.SERVER_HOST}/api/auth/verify/${model.emailToken}`,
      });
    } else {
      throw new HttpException(
        'REGISTER.USER_NOT_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async sendEmailForgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const tokenModel = await this.createForgottenPasswordToken(email);

    if (tokenModel && tokenModel.newPasswordToken) {
      this.emailService.sendEmail('reset', email, 'Reset Password', {
        URL: `${process.env.SERVER_HOST}/api/auth/reset-password/${tokenModel.newPasswordToken}`,
      });
    } else {
      throw new HttpException(
        'REGISTER.USER_NOT_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
