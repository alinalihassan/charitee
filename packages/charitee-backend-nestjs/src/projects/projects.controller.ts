import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Project } from './projects.schema';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiQuery({ 
    name: 'page',
    required: false,
  })
  @ApiQuery({ 
    name: 'themeIds',
    required: false,
  })
  @ApiQuery({ 
    name: 'countryCodes',
    required: false,
  })
  @Get()
  get(@Query('page') page?: string, @Query('themeIds') themeIds?: string, @Query('countryCodes') countryCodes?: string): Promise<Project[]> {
    return this.projectsService.findAll(page? +page : 0, themeIds, countryCodes);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findById(id);
  }
}
