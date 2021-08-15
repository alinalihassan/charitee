import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { error, success, fail } from 'src/common/dto/response.dto';
import { JSendObject } from 'src/common/interfaces/response.interface';
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
  @HttpCode(HttpStatus.OK)
  @Get()
  async get(
    @Query('page') page?: string,
    @Query('themeIds') themeIds?: string,
    @Query('countryCodes') countryCodes?: string,
  ): Promise<JSendObject<Project[]>> {
    const projects = await this.projectsService.findAll(
      page ? +page : 0,
      themeIds,
      countryCodes,
    );

    return success(projects);
  }

  @ApiOperation({ summary: 'Get a Project by ID.' })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<JSendObject<Project>> {
    try {
      var projects = await this.projectsService.findById(id);
    } catch (err) {
      console.trace(err);
      error("Unknown error occurred", HttpStatus.BAD_REQUEST);
    }
    if (projects) {
      return success(projects);
    } else {
      return fail(`No project found with id - ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
