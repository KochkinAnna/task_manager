import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { Category } from '../common/orm/entities/category.entity';
import { Task } from '../common/orm/entities/task.entity';

import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.name = createTaskDto.name;
    task.dateStart = new Date(createTaskDto.dateStart);
    task.dateEnd = new Date(createTaskDto.dateEnd);
    task.category = await this.categoryRepository.findOne({
      where: { id: createTaskDto.categoryId },
    });

    const errors = await validate(task);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return this.taskRepository.save(task);
  }

  async getList(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getItem(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async delete(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.delete(id);
  }

  async edit(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.name) {
      task.name = updateTaskDto.name;
    }

    if (updateTaskDto.dateStart) {
      task.dateStart = new Date(updateTaskDto.dateStart);
    }

    if (updateTaskDto.dateEnd) {
      task.dateEnd = new Date(updateTaskDto.dateEnd);
    }

    if (updateTaskDto.categoryId) {
      task.category = await this.categoryRepository.findOne({
        where: { id: updateTaskDto.categoryId },
      });
    }

    const errors = await validate(task);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return this.taskRepository.save(task);
  }
}
