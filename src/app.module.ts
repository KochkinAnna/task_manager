import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesResolver } from './categories/categories.resolver';
import { CategoriesService } from './categories/categories.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksResolver } from './tasks/tasks.resolver';
import { TasksService } from './tasks/tasks.service';
import { UsersModule } from './users/users.module';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    } as TypeOrmModuleAsyncOptions),
    CategoriesModule,
    TasksModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'src/common/orm/schema.gql'),
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CategoriesService,
    TasksService,
    UsersService,
    CategoriesResolver,
    TasksResolver,
    UsersResolver,
  ],
})
export class AppModule {}
