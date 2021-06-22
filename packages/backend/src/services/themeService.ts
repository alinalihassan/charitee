import Theme from "../models/Theme"
import { IThemeDocument } from "../models/Documents"
import { DataResponse } from "../models/Interfaces"
import { StatusCodes } from "http-status-codes"

export class ThemeService {
    public async get(): Promise<DataResponse> {
    
        const themes: IThemeDocument[] = await Theme.find().exec();
    
        return {status: StatusCodes.OK, data: themes};
    }

    public async getById(id: string): Promise<DataResponse> {
        let theme = Theme.findById(id).exec();

        if (theme) {
            return {status: StatusCodes.OK, data: theme}
          }
          
          return {status: StatusCodes.NOT_FOUND, data: null}
    }
}