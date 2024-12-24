import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserEntity {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  message: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
