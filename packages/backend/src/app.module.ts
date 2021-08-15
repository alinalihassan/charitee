import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { ThemesModule } from './themes/themes.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthController } from './health/health.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { EmailModule } from './email/email.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend', 'build'),
    }),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_KEY,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`,
    ),
    TerminusModule,
    AuthModule,
    EmailModule,
    CountriesModule,
    ThemesModule,
    OrganizationsModule,
    ProjectsModule,
    UsersModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
