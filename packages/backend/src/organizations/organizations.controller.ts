import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Organization } from './organizations.schema';
import { OrganizationsService } from './organizations.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

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
  @ApiOperation({ summary: 'Get all Organizations in chunks of 10, filter by comma separated themes and countries' })
  @Get()
  get(
    @Query('page') page?: string,
    @Query('themeIds') themeIds?: string,
    @Query('countryCodes') countryCodes?: string,
  ): Promise<Organization[]> {
    return this.organizationsService.findAll(
      page ? +page : 0,
      themeIds,
      countryCodes,
    );
  }

  @ApiOperation({ summary: 'Get an Organization by ID' })
  @Get(':id')
  getById(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.findById(id);
  }
}
