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
import { error, success } from 'src/common/dto/response.dto';
import { JSendObject } from 'src/common/interfaces/response.interface';
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
  async register(@Body() createUserDto: CreateUserDto): Promise<JSendObject<null>> {
    try {
      const newUser = await this.userService.create(createUserDto);
      await this.authService.createEmailToken(newUser.email);
      await this.authService.sendEmailVerification(newUser.email);

      return success(null, 'REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
    } catch (err) {
      console.trace(err);
      return error({
        message: 'Registration error',
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Verify a user\'s email. The link with the token is included in the confirmation email.' })
  @Get('verify/:token')
  public async verifyEmail(@Param('token') token: string): Promise<JSendObject<null>> {
    try {
      await this.authService.verifyEmail(token);
      return success(null, 'Email verified successfully');
    } catch (err) {
      console.trace(err);
      return error({
        message: 'Login error', 
        data: err
      });
    }
  }

  @ApiOperation({ summary: 'Resend a user\'s confirmation email.' })
  @Get('resend-verification/:email')
  public async sendEmailVerification(
    @Param('email') email: string,
  ): Promise<JSendObject<null>> {
    try {
      await this.authService.createEmailToken(email);
      await this.authService.sendEmailVerification(email);
      return success(null, "Verification email sent");
    } catch (err) {
      console.trace(err);
      return error({
        message: 'Send email error', 
        data: err
      });
    }
  }

  @ApiOperation({ summary: 'Send an email to the user to initiate resetting the password.' })
  @Get('email/forgot-password/:email')
  public async sendEmailForgotPassword(
    @Param('email') email: string,
  ): Promise<JSendObject<null>> {
    try {
      await this.authService.sendEmailForgotPassword(email);
      return success(null, 'Email resent successfully');
    } catch (err) {
      console.trace(err);
      return error({
        message: 'Send email error', 
        data: err
      });
    }
  }

  @ApiOperation({ summary: 'Reset the user\s password. It needs the token from email.' })
  @Post('reset-password')
  public async setNewPassword(
    @Body() resetPassword: ResetPasswordDto,
  ): Promise<JSendObject<null>> {
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
        return error('Password change error');
      }
      return success(null, 'Password changed successfully');
    } catch (err) {
      console.trace(err);
      return error({
        message: 'Password change error', 
        data: err
      });
    }
  }
}
