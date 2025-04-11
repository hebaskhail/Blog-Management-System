import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;


  @ApiProperty({ example: 'Test1234' })
  @IsNotEmpty() 
  @MinLength(6)
  readonly password: string;
}
