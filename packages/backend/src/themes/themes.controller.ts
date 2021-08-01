import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Theme } from './themes.schema';
import { ThemesService } from './themes.service';

@ApiTags('themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  get(): Promise<Theme[]> {
    return this.themesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Theme> {
    return this.themesService.findById(id);
  }
}
