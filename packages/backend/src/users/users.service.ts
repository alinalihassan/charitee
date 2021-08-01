import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(newUser: CreateUserDto): Promise<User> {
    if (this.isValidEmail(newUser.email) && newUser.password) {
      const userRegistered = await this.findByEmail(newUser.email);
      if (!userRegistered) {
        newUser.password = await hash(newUser.password, 10);
        const createdUser = new this.userModel(newUser);
        return await createdUser.save();
      } else if (!userRegistered.isVerified) {
        return userRegistered;
      } else {
        throw new HttpException(
          'REGISTRATION.USER_ALREADY_REGISTERED',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException(
        'REGISTRATION.MISSING_MANDATORY_PARAMETERS',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async confirmEmail(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email: email }).exec();
    user.isVerified = true;
    user.save();
  }

  async setPassword(email: string, newPassword: string): Promise<void> {
    const userFromDb = await this.userModel.findOne({ email: email });
    if (!userFromDb)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    userFromDb.password = await hash(newPassword, 10);
    await userFromDb.save();
  }

  isValidEmail(email: string) {
    if (email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }
}
