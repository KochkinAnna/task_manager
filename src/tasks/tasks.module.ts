import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from '../categories/categories.module';
import { Task } from '../common/orm/entities/task.entity';

import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => CategoriesModule),
  ],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
