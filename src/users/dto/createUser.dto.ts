import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { EUserRoles } from '../../common/enums/userRoles.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Email address of the user',
  })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsNotEmpty({ message: 'Password field cannot be empty' })
  @Length(4, 10, {
    message: 'Password must contain a minimum of 4 symbols and a maximum of 10',
  })
  password: string;

  @ApiProperty({
    example: EUserRoles.user,
    description: 'Role of the user',
  })
  @IsNotEmpty({ message: 'Role cannot be empty' })
  @IsString({ message: 'Role must be a string' })
  role: EUserRoles;
}
