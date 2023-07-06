import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Complete project report',
    description: 'Name of the task',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Task name must be a string' })
  name?: string;

  @ApiProperty({
    example: '2023-07-04',
    description: 'Date when the task starts',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateStart?: string;

  @ApiProperty({
    example: '2023-07-10',
    description: 'Date when the task ends',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateEnd?: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID to which the task belongs',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'Category ID must be an integer' })
  categoryId?: number;
}
