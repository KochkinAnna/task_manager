import { Module } from '@nestjs/common';

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
  imports: [CategoriesModule, UsersModule, TasksModule],
  controllers: [AppController],
  providers: [
    AppService,
    UsersResolver,
    UsersService,
    TasksResolver,
    TasksService,
    CategoriesResolver,
    CategoriesService,
  ],
})
export class AppModule {}
