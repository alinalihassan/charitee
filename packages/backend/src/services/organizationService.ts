import Theme from '../models/Theme';
import {
  IThemeDocument,
  ICountryDocument,
  IOrganizationDocument,
} from '../models/Documents';
import Country from '../models/Country';
import Organization from '../models/Organization';
import {
  DataResponse,
  IOrganization,
  ManyDataResponse,
} from '../models/Interfaces';
import {StatusCodes} from 'http-status-codes';

export class OrganizationService {
  public async get(
    page = 0,
    themeIds: string = null,
    countryCodes: string = null
  ): Promise<ManyDataResponse<IOrganization>> {
    const query: any = {};

    if (themeIds !== null) {
      const themes: Array<IThemeDocument> = await Theme.find().exec();
      const themesList = themeIds.split(',');
      const themeIdList: Array<String> = [];

      themes.forEach((theme: IThemeDocument) => {
        if (themesList.includes(theme.id)) {
          themeIdList.push(theme._id);
        }
      });

      if (themeIdList.length > 0) {
        query.themes = {$in: themeIdList};
      }
    }

    if (countryCodes !== null) {
      const countries: Array<ICountryDocument> = await Country.find().exec();
      const countriesList = countryCodes.split(',');
      const countryIdsList: Array<String> = [];

      countries.forEach((country: ICountryDocument) => {
        if (countriesList.includes(country.countryCode)) {
          countryIdsList.push(country._id);
        }
      });

      if (countryIdsList.length > 0) {
        query.countries = {$in: countryIdsList};
      }
    }

    const organizations: IOrganizationDocument[] = await Organization.find(
      query
    )
      .populate('themes')
      .populate('address.country')
      .limit(10)
      .skip(page)
      .exec();

    const count: number = await Organization.countDocuments(query);
    const nextPage: number = organizations.length === 10 ? page + 10 : null;

    return {
      status: StatusCodes.OK,
      count: count,
      nextPage: nextPage,
      data: organizations,
    };
  }

  public async getById(id: number): Promise<DataResponse<IOrganization>> {
    const organization = await Organization.findById(id)
      .populate('themes')
      .populate('address.country')
      .exec();

    if (organization) {
      return {status: StatusCodes.OK, data: organization};
    }

    return {status: StatusCodes.NOT_FOUND, data: null};
  }
}
