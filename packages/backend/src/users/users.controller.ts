import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JSendObject } from 'src/common/interfaces/response.interface';
import { User } from './users.schema';
import { error, success, fail } from 'src/common/dto/response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users..' })
  @Get()
  async findAll(): Promise<JSendObject<User[]>> {
    const users = await this.usersService.findAll();
    return success(users);
  }

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({ summary: 'Get a user by ID.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JSendObject<User>> {
    try {
      var user =  await this.usersService.findById(id);
    } catch (err) {
      console.trace(err);
      error("Unknown error occurred", HttpStatus.BAD_REQUEST);
    }
    if (user) {
      return success(user);
    } else {
      fail(`No user found with id - ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
