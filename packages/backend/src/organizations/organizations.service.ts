import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from 'src/countries/countries.schema';
import { Theme, ThemeDocument } from 'src/themes/themes.schema';
import { Organization, OrganizationDocument } from './organizations.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async findAll(
    page = 0,
    themeIds: string = null,
    countryCodes: string = null,
  ): Promise<Organization[]> {
    const query: any = {};

    if (themeIds !== null) {
      const themes: Array<Theme> = await this.themeModel.find().exec();
      const themesList = themeIds.split(',');
      const themeIdList: Array<string> = [];

      themes.forEach((theme: Theme) => {
        if (themesList.includes(theme.id)) {
          themeIdList.push(theme._id);
        }
      });

      if (themeIdList.length > 0) {
        query.themes = { $in: themeIdList };
      }
    }

    if (countryCodes !== null) {
      const countries: Array<Country> = await this.countryModel.find().exec();
      const countriesList = countryCodes.split(',');
      const countryIdsList: Array<string> = [];

      countries.forEach((country: Country) => {
        if (countriesList.includes(country.countryCode)) {
          countryIdsList.push(country._id);
        }
      });

      if (countryIdsList.length > 0) {
        query.countries = { $in: countryIdsList };
      }
    }

    const organizations: Organization[] = await this.organizationModel
      .find(query)
      .populate('themes')
      .populate('address.country')
      .limit(10)
      .skip(page)
      .exec();

    return organizations;
  }

  async findById(id: string): Promise<Organization> {
    return this.organizationModel
      .findById(id)
      .populate('themes')
      .populate('address.country')
      .exec();
  }
}
