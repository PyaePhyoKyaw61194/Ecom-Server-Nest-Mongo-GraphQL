import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Tag } from './schema/tag.schema';

@Injectable()
export class TagSeeder implements Seeder {
  constructor(@InjectModel(Tag.name) private tag: Model<Tag>) {}

  async seed(): Promise<any> {
    return this.tag.insertMany([
      {
        name: 'clothes',
        color: 'yellow',
        type: 'internal',
      },
      {
        name: 'accessories',
        color: 'green',
        type: 'external',
      },
      {
        name: 'mobile',
        color: 'tomato',
        type: 'external',
      },
      {
        name: 'electronics',
        color: 'brown',
        type: 'internal',
      },
      {
        name: 'present',
        color: 'black',
        type: 'internal',
      },
    ]);
  }
  async drop(): Promise<any> {
    return this.tag.deleteMany({});
  }
}
