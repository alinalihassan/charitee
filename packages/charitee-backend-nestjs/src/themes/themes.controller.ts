import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThemesService } from './themes.service';

@ApiTags('themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  get() {
    return this.themesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.themesService.findById(id);
  }
}
