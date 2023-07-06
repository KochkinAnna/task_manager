import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Task } from '../common/orm/entities/task.entity';

import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Resolver('Task')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: Task,
  })
  @ApiBody({ type: CreateTaskDto })
  @Mutation()
  async create(@Args('input') createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieved task list successfully',
    type: [Task],
  })
  @Query()
  async getList(): Promise<Task[]> {
    return this.tasksService.getList();
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieved task successfully',
    type: Task,
  })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Query()
  async getItem(@Args('id') id: number): Promise<Task> {
    return this.tasksService.getItem(id);
  }

  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Mutation()
  async delete(@Args('id') id: number): Promise<void> {
    return this.tasksService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: Task,
  })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: CreateTaskDto })
  @Mutation()
  async edit(
    @Args('id') id: number,
    @Args('input') updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.edit(id, updateTaskDto);
  }
}
