import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @ApiBody({ type: LoginDTO })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() email: string, @Body() password: string): Promise<User> {
    return req.user;
  }
}