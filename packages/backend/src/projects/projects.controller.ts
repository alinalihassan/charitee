import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get all Projects in chunks of 10, filter by comma separated themes and countries' })
  @Get()
  get(
    @Query('page') page?: string,
    @Query('themeIds') themeIds?: string,
    @Query('countryCodes') countryCodes?: string,
  ): Promise<Project[]> {
    return this.projectsService.findAll(
      page ? +page : 0,
      themeIds,
      countryCodes,
    );
  }

  @ApiOperation({ summary: 'Get a Project by ID.' })
  @Get(':id')
  getById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findById(id);
  }
}
