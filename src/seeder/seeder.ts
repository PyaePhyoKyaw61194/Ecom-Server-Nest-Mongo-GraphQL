import { ConfigModule } from '@nestjs/config';
import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSeeder } from 'src/permission/permission.seeder';
import {
  Permission,
  PermissionSchema,
} from 'src/permission/schema/permission.schema';
import { Role, RoleSchema } from 'src/role/schema/role.schema';
import { RoleSeeder } from 'src/role/role.seeder';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserSeeder } from 'src/user/user.seeder';
import { Setting, SettingSchema } from 'src/setting/schema/setting.schema';
import { SettingSeeder } from 'src/setting/setting.seeder';
import { Tag, TagSchema } from 'src/tag/schema/tag.schema';
import { TagSeeder } from 'src/tag/tag.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev.local', '.env.prod.local'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Setting.name, schema: SettingSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
}).run([PermissionSeeder, RoleSeeder, UserSeeder, SettingSeeder, TagSeeder]);
