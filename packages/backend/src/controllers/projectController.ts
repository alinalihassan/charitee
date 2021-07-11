import {DataResponse, IProject, ManyDataResponse} from '../models/Interfaces';
import {ProjectService} from '../services/projectService';
import {Controller, Get, Path, Query, Route, Tags} from 'tsoa';

@Tags('Project')
@Route('projects')
export class ProjectController extends Controller {
  @Get('{projectId}')
  public async getProjectById(
    @Path() projectId: number
  ): Promise<DataResponse<IProject>> {
    return new ProjectService().getById(projectId);
  }

  @Get()
  public async getProjects(
    @Query() page?: number,
    @Query() theme?: string,
    @Query() country?: string
  ): Promise<ManyDataResponse<IProject>> {
    return new ProjectService().get(page ? page : 0, theme, country);
  }
}
