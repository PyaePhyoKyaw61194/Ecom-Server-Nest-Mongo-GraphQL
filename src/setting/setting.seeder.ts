import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Setting } from './schema/setting.schema';

@Injectable()
export class SettingSeeder implements Seeder {
  constructor(@InjectModel(Setting.name) private setting: Model<Setting>) {}

  async seed(): Promise<any> {
    return this.setting.insertMany([
      {
        name: 'isPaid',
        color: 'yellow',
      },
      {
        name: 'isDelivered',
        color: 'green',
      },
      {
        name: 'isPaidDeliveryFee',
        color: 'tomato',
      },
      {
        name: 'isOrderCollected',
        color: 'brown',
      },
      {
        name: 'isOrderCancelled',
        color: 'black',
      },
    ]);
  }

  async drop(): Promise<any> {
    return this.setting.deleteMany({});
  }
}
