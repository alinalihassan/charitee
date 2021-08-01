import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project, ProjectSchema } from './projects.schema';
import { Country, CountrySchema } from 'src/countries/countries.schema';
import { Theme, ThemeSchema } from 'src/themes/themes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
