import {
  DataResponse,
  IOrganization,
  ManyDataResponse,
} from '../models/Interfaces';
import {OrganizationService} from '../services/organizationService';
import {Controller, Get, Path, Query, Route, Tags} from 'tsoa';

@Tags('Organization')
@Route('organizations')
export class OrganizationController extends Controller {
  @Get('{organizationId}')
  public async getOrganizationById(
    @Path() organizationId: number
  ): Promise<DataResponse<IOrganization>> {
    return new OrganizationService().getById(organizationId);
  }

  @Get()
  public async getOrganizations(
    @Query() page?: number,
    @Query() theme?: string,
    @Query() country?: string
  ): Promise<ManyDataResponse<IOrganization>> {
    return new OrganizationService().get(page ? page : 0, theme, country);
  }
}
