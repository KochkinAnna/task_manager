import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../common/orm/entities/category.entity';
import { Task } from '../common/orm/entities/task.entity';
import { TasksModule } from '../tasks/tasks.module';

import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Task]),
    forwardRef(() => TasksModule),
  ],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService, TypeOrmModule],
})
export class CategoriesModule {}
