import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { error, success, fail } from 'src/common/dto/response.dto';
import { JSendObject } from 'src/common/interfaces/response.interface';
import { Country } from './countries.schema';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all Countries' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async get(): Promise<JSendObject<Country[]>> {
    const countries = await this.countriesService.findAll();
    return success(countries);
  }

  @ApiOperation({ summary: 'Get a Country by ID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<JSendObject<Country>> {
    try {
      var theme = await this.countriesService.findById(id);
    } catch (err) {
      console.trace(err);
      error("Unknown error occurred", HttpStatus.BAD_REQUEST);
    }
    if (theme) {
      return success(theme);
    } else {
      return fail(`No theme found with id - ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
