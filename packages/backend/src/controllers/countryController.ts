import {DataResponse, ICountry, ManyDataResponse} from '../models/Interfaces';
import {Controller, Get, Path, Route, Tags} from 'tsoa';
import {CountryService} from '../services/countryService';

@Tags('Country')
@Route('countries')
export class CountryController extends Controller {
  @Get('{countryCode}')
  public async getCountryById(
    @Path() countryCode: string
  ): Promise<DataResponse<ICountry>> {
    return new CountryService().getById(countryCode);
  }

  @Get()
  public async getCountries(): Promise<ManyDataResponse<ICountry>> {
    return new CountryService().get();
  }
}
