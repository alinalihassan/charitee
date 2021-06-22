import { DataResponse } from "../models/Interfaces";
import { ThemeService } from "../services/themeService";
import {
  Controller,
  Get,
  Path,
  Route,
  Tags,
} from "tsoa";

@Tags("Theme")
@Route("themes")
export class ThemeController extends Controller {

  @Get("{themeId}")
  public async getThemeById(
    @Path() themeId: string
  ): Promise<DataResponse> {
    return new ThemeService().getById(themeId);
  }

  @Get()
  public async getThemes(): Promise<DataResponse> {
    return new ThemeService().get();
  }
}