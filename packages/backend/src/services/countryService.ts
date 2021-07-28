import {ICountryDocument} from '../models/Documents';
import {DataResponse, ICountry, ManyDataResponse} from '../models/Interfaces';
import {StatusCodes} from 'http-status-codes';
import Country from '../models/Country';

export class CountryService {
  public async get(): Promise<ManyDataResponse<ICountry>> {
    const countries: ICountryDocument[] = await Country.find().exec();
    const count: number = await Country.countDocuments({});

    return {status: StatusCodes.OK, count: count, data: countries};
  }

  public async getById(id: string): Promise<DataResponse<ICountry>> {
    const country = await Country.findById(id).exec();

    if (country) {
      return {status: StatusCodes.OK, data: country};
    }

    return {status: StatusCodes.NOT_FOUND, data: null};
  }
}
