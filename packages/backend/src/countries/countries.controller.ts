import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Country } from './countries.schema';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all Countries' })
  @Get()
  get(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'Get a Country by ID' })
  @Get(':id')
  getById(@Param('id') id: string): Promise<Country> {
    return this.countriesService.findById(id);
  }
}
