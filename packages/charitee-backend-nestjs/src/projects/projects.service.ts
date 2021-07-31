import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from 'src/countries/countries.schema';
import { Theme, ThemeDocument } from 'src/themes/themes.schema';
import { Project, ProjectDocument } from './projects.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
              @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
              @InjectModel(Country.name) private countryModel: Model<CountryDocument>) {}

  async findAll(
    page: number = 0,
    themeIds: string = null,
    countryCodes: string = null
  ): Promise<Project[]> {
    const query: any = {};

    if (themeIds !== null) {
      const themes: Array<Theme> = await this.themeModel.find().exec();
      const themesList = themeIds.split(',');
      const themeIdList: Array<String> = [];

      themes.forEach((theme: Theme) => {
        if (themesList.includes(theme.id)) {
          themeIdList.push(theme._id);
        }
      });

      if (themeIdList.length > 0) {
        query.themes = {$in: themeIdList};
      }
    }

    if (countryCodes !== null) {
      const countries: Array<Country> = await this.countryModel.find().exec();
      const countriesList = countryCodes.split(',');
      const countryIdsList: Array<String> = [];

      countries.forEach((country: Country) => {
        if (countriesList.includes(country.countryCode)) {
          countryIdsList.push(country._id);
        }
      });

      if (countryIdsList.length > 0) {
        query.countries = {$in: countryIdsList};
      }
    }

    const projects: Project[] = await this.projectModel.find(
      query
    )
      .populate('themes')
      .populate('countries')
      .populate('country')
      .limit(10)
      .skip(page)
      .exec();
    
    return projects;
  }

  async findById(id: string): Promise<Project> {
    return this.projectModel.findById(id)
      .populate('themes')
      .populate('countries')
      .populate('country')
      .exec();
  }
}
