import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { Category } from '../common/orm/entities/category.entity';

import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;

    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return this.categoryRepository.save(category);
  }

  async getList(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getItem(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = updateCategoryDto.name;

    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return this.categoryRepository.save(category);
  }
}
