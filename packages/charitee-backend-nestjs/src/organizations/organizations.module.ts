import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './organizations.schema';
import { Country, CountrySchema } from 'src/countries/countries.schema';
import { Theme, ThemeSchema } from 'src/themes/themes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }])
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}