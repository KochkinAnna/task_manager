import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Work',
    description: 'The name of category',
  })
  @IsOptional()
  @IsString({ message: 'Category name must be a string' })
  name?: string;
}
