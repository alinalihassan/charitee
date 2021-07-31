import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './countries.schema';

@Injectable()
export class CountriesService {
  constructor(@InjectModel(Country.name) private countryModel: Model<CountryDocument>) {}

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findById(id: string): Promise<Country> {
    return this.countryModel.findById(id).exec();
  }
}
