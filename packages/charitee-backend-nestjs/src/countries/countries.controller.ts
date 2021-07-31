import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  get() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.countriesService.findById(id);
  }
}
