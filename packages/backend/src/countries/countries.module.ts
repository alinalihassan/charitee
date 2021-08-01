import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country, CountrySchema } from './countries.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    EmailModule,
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
