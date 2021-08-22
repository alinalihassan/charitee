import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { error, success, fail } from 'src/common/dto/response.dto';
import { JSendObject } from 'src/common/interfaces/response.interface';
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
  @HttpCode(HttpStatus.OK)
  @Get()
  async get(
    @Query('page') page?: string,
    @Query('themeIds') themeIds?: string,
    @Query('countryCodes') countryCodes?: string,
  ): Promise<JSendObject<Organization[]>> {
    const organizations = await this.organizationsService.findAll(
      page ? +page : 0,
      themeIds,
      countryCodes,
    );

    return success(organizations);
  }

  @ApiOperation({ summary: 'Get an Organization by ID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<JSendObject<Organization>> {
    try {
      var organization = await this.organizationsService.findById(id);
    } catch (err) {
      console.trace(err);
      error("Unknown error occurred", HttpStatus.BAD_REQUEST);
    }
    if (organization) {
      return success(organization);
    } else {
      return fail(`No organization found with id - ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
