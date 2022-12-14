import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TagModule } from './tag/tag.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev.local', '.env.prod.local'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TagModule,
    OrderModule,
    ProductModule,
    SettingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
