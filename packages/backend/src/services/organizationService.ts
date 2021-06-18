import Theme from "../models/Theme"
import { IThemeDocument, ICountryDocument, IOrganizationDocument } from "../models/Documents"
import Country from "../models/Country"
import Organization from "../models/Organization"
import { DataResponse, ManyDataResponse } from "../models/Interfaces"
import { StatusCodes } from "http-status-codes"

export class OrganizationService {
    public async get(page: number = 0, themeId: string = null, countryCode: string = null): Promise<ManyDataResponse> {
        let query: any = {}
    
        const theme: IThemeDocument = await Theme.findOne({id: themeId}).exec()
        const country: ICountryDocument = await Country.findOne({countryCode: countryCode}).exec()
    
        if (theme != null) {
            query.themes = theme._id
        }
        if (country != null) {
            query.address.country = country._id
        }
    
        const organizations: IOrganizationDocument[] = await Organization.find(query)
        .populate('themes')
        .populate('address.country')
        .limit(10).skip(page).exec();
    
        const count: number = await Organization.countDocuments(query)
        const nextPage: number = organizations.length == 10 ? page + 10 : null
    
        return {status: StatusCodes.OK, count: count, nextPage: nextPage, data: organizations};
    }

    public async getById(id: number): Promise<DataResponse> {
        let organization = Organization.findById(id)
            .populate('themes')
            .populate('address.country')
            .exec();

        if (organization) {
            return {status: StatusCodes.OK, data: organization}
          }
          
          return {status: StatusCodes.NOT_FOUND, data: null}
    }
}