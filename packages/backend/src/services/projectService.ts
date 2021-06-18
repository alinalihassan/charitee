import Theme from "../models/Theme"
import { IThemeDocument, ICountryDocument, IProjectDocument } from "../models/Documents"
import Country from "../models/Country"
import Project from "../models/Project"
import { DataResponse } from "../models/Interfaces"
import { ManyDataResponse } from "../models/Interfaces"
import { StatusCodes } from "http-status-codes"

export class ProjectService {
  public async get(page: number = 0, themeId: string = null, countryCode: string = null): Promise<ManyDataResponse> {
    let query: any = {}

    const theme: IThemeDocument = await Theme.findOne({ id: themeId }).exec()
    const country: ICountryDocument = await Country.findOne({ countryCode: countryCode }).exec()

    if (theme != null) {
      query.themes = theme._id
    }
    if (country != null) {
      query.countries = country._id
    }

    const projects: IProjectDocument[] = await Project.find(query)
      .populate('themes')
      .populate('countries')
      .limit(10).skip(page).exec();

    const count: number = await Project.countDocuments(query)
    const nextPage: number = projects.length == 10 ? page + 10 : null

    return { status: StatusCodes.OK, count: count, nextPage: nextPage, data: projects };
  }

  public async getById(id: number): Promise<DataResponse> {
    let project = Project.findById(id)
      .populate('themes')
      .populate('countries')
      .exec();
    
    if (project) {
      return {status: StatusCodes.OK, data: project}
    }
    
    return {status: StatusCodes.BAD_REQUEST, data: null}
  }
}