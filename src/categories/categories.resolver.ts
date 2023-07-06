import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Category } from '../common/orm/entities/category.entity';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@ApiTags('categories')
@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: Category,
  })
  @ApiBody({ type: CreateCategoryDto })
  @Mutation()
  async create(
    @Args('input') createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieved category list successfully',
    type: [Category],
  })
  @Query()
  async getCategoryList(): Promise<Category[]> {
    return this.categoriesService.getList();
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieved category successfully',
    type: Category,
  })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @Query()
  async getCategoryById(@Args('id') id: number): Promise<Category> {
    return this.categoriesService.getItem(id);
  }

  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @Mutation()
  async deleteCategory(@Args('id') id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: Category,
  })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ type: CreateCategoryDto })
  @Mutation()
  async editCategory(
    @Args('id') id: number,
    @Args('input') updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }
}
