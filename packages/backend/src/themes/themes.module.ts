import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { Theme, ThemeSchema } from './themes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
  ],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
