import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme, ThemeDocument } from './themes.schema';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
  ) {}

  async findAll(): Promise<Theme[]> {
    return this.themeModel.find().exec();
  }

  async findById(id: string): Promise<Theme> {
    return this.themeModel.findById(id).exec();
  }
}
