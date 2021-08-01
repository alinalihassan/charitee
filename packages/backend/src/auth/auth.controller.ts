import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessToken } from './interfaces/accesstoken.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiBody({ type: LoginDTO })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Logs in the user' })
  @Post('login')
  async login(@Request() req): Promise<AccessToken> {
    return req.user;
  }

  @ApiOperation({
    summary:
      'Register the user in the platform, an automatic confirmation email is sent.',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      const newUser = await this.userService.create(createUserDto);
      await this.authService.createEmailToken(newUser.email);
      await this.authService.sendEmailVerification(newUser.email);

      return new ResponseSuccess('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
    } catch (error) {
      console.trace(error);
      return new ResponseError('REGISTRATION.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('verify/:token')
  public async verifyEmail(@Param('token') token: string): Promise<IResponse> {
    try {
      const isEmailVerified = await this.authService.verifyEmail(token);
      return new ResponseSuccess('LOGIN.EMAIL_VERIFIED', isEmailVerified);
    } catch (error) {
      return new ResponseError('LOGIN.ERROR', error);
    }
  }

  @Get('resend-verification/:email')
  public async sendEmailVerification(
    @Param('email') email: string,
  ): Promise<IResponse> {
    try {
      await this.authService.createEmailToken(email);
      await this.authService.sendEmailVerification(email);
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
    }
  }

  @Get('email/forgot-password/:email')
  public async sendEmailForgotPassword(
    @Param('email') email: string,
  ): Promise<IResponse> {
    try {
      await this.authService.sendEmailForgotPassword(email);
      return new ResponseSuccess('LOGIN.EMAIL_RESENT');
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
    }
  }

  @Post('reset-password')
  public async setNewPassword(
    @Body() resetPassword: ResetPasswordDto,
  ): Promise<IResponse> {
    try {
      if (resetPassword.email && resetPassword.currentPassword) {
        await this.authService.validateUser(
          resetPassword.email,
          resetPassword.currentPassword,
        );
        await this.userService.setPassword(
          resetPassword.email,
          resetPassword.newPassword,
        );
      } else if (resetPassword.newPasswordToken) {
        const forgottenPasswordModel =
          await this.authService.getForgottenPasswordModel(
            resetPassword.newPasswordToken,
          );
        await this.userService.setPassword(
          forgottenPasswordModel.email,
          resetPassword.newPassword,
        );
        await forgottenPasswordModel.remove();
      } else {
        return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR');
      }
      return new ResponseSuccess('RESET_PASSWORD.PASSWORD_CHANGED');
    } catch (error) {
      return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR', error);
    }
  }
}
