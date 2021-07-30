import Theme from '../models/Theme';
import {
  IThemeDocument,
  ICountryDocument,
  IProjectDocument,
} from '../models/Documents';
import Country from '../models/Country';
import Project from '../models/Project';
import {DataResponse, IProject} from '../models/Interfaces';
import {ManyDataResponse} from '../models/Interfaces';
import {StatusCodes} from 'http-status-codes';

export class ProjectService {
  public async get(
    page = 0,
    themeIds: string = null,
    countryCodes: string = null
  ): Promise<ManyDataResponse<IProject>> {
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

    const projects: IProjectDocument[] = await Project.find(query)
      .populate('themes')
      .populate('countries')
      .limit(10)
      .skip(page)
      .exec();

    const count: number = await Project.countDocuments(query);
    const nextPage: number = projects.length === 10 ? page + 10 : null;

    return {
      status: StatusCodes.OK,
      count: count,
      nextPage: nextPage,
      data: projects,
    };
  }

  public async getById(id: number): Promise<DataResponse<IProject>> {
    const project = await Project.findById(id)
      .populate('themes')
      .populate('countries')
      .exec();

    if (project) {
      return {status: StatusCodes.OK, data: project};
    }

    return {status: StatusCodes.BAD_REQUEST, data: null};
  }
}
