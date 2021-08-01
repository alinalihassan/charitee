import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Country } from './countries.schema';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Country> {
    return this.countriesService.findById(id);
  }
}
