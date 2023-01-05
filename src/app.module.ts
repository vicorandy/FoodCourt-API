import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './addons/addons.module';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { UserAuthMiddleware } from './middlewares/userauth.middleware';
import { BrandsController } from './brands/brands.controller';
import keys from './config/keys';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AddonsModule,
    KnexModule.forRoot({
      config: {
        client: 'postgres',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: keys.postgreshost,
          user: keys.postgresusername,
          password: keys.postgresPassword,
          database: keys.postgresdatabase,
        },
      },
    }),
    UsersModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      // .exclude({ path: 'brands/:id/addons', method: RequestMethod.POST })
      .forRoutes(BrandsController);
  }
}
