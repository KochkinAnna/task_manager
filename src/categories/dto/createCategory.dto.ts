import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Work',
    description: 'The name of category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
