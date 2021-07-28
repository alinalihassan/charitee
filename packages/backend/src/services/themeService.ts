import Theme from '../models/Theme';
import {IThemeDocument} from '../models/Documents';
import {DataResponse, ITheme, ManyDataResponse} from '../models/Interfaces';
import {StatusCodes} from 'http-status-codes';

export class ThemeService {
  public async get(): Promise<ManyDataResponse<ITheme>> {
    const themes: IThemeDocument[] = await Theme.find().exec();
    const count: number = await Theme.countDocuments({});

    return {status: StatusCodes.OK, count: count, data: themes};
  }

  public async getById(id: string): Promise<DataResponse<ITheme>> {
    const theme = await Theme.findById(id).exec();

    if (theme) {
      return {status: StatusCodes.OK, data: theme};
    }

    return {status: StatusCodes.NOT_FOUND, data: null};
  }
}
