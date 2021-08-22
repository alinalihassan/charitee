import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { error, success, fail } from 'src/common/dto/response.dto';
import { JSendObject } from 'src/common/interfaces/response.interface';
import { Theme } from './themes.schema';
import { ThemesService } from './themes.service';

@ApiTags('themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @ApiOperation({ summary: 'Get all themes.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async get(): Promise<JSendObject<Theme[]>> {
    const themes = await this.themesService.findAll();
    return success(themes);
  }

  @ApiOperation({ summary: 'Get a theme by ID.' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<JSendObject<Theme>> {
    try {
      var theme = await this.themesService.findById(id);
    } catch (err) {
      console.trace(err);
      error("Unknown error occurred", HttpStatus.BAD_REQUEST);
    }
    if (theme) {
      return success(theme);
    } else {
      return fail(`No theme found with id - ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
