import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @Get()
  get(@Query('page') page?: string, @Query('themeIds') themeIds?: string, @Query('countryCodes') countryCodes?: string): Promise<any> {
    return this.organizationsService.findAll(page? +page : 0, themeIds, countryCodes);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.organizationsService.findById(id);
  }
}
