import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { ThemesModule } from './themes/themes.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend', 'build'),
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`),
    TerminusModule,
    CountriesModule,
    ThemesModule,
    OrganizationsModule,
    ProjectsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
