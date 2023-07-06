import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete project report',
    description: 'Name of the task',
  })
  @IsNotEmpty({ message: 'Task name cannot be empty' })
  @IsString({ message: 'Task name must be a string' })
  @Length(2, 50, {
    message:
      'Task name must contain a minimum of 2 letters and a maximum of 50',
  })
  name: string;

  @ApiProperty({
    example: '2023-07-04',
    description: 'Date when the task starts',
  })
  @IsNotEmpty({ message: 'Start date cannot be empty' })
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    example: '2023-07-10',
    description: 'Date when the task ends',
  })
  @IsNotEmpty({ message: 'End date cannot be empty' })
  @IsDateString()
  dateEnd: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID to which the task belongs',
  })
  @IsNotEmpty({ message: 'Category ID cannot be empty' })
  @IsInt({ message: 'Category ID must be an integer' })
  categoryId: number;
}
