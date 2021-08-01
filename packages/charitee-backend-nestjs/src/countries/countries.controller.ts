import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
