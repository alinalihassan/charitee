import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Theme } from './themes.schema';
import { ThemesService } from './themes.service';

@ApiTags('themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @ApiOperation({ summary: 'Get all themes.' })
  @Get()
  get(): Promise<Theme[]> {
    return this.themesService.findAll();
  }

  @ApiOperation({ summary: 'Get a theme by ID.' })
  @Get(':id')
  getById(@Param('id') id: string): Promise<Theme> {
    return this.themesService.findById(id);
  }
}
