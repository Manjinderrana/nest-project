import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserEntity {
  @IsString()
  @IsNotEmpty()
  _id: string

  @IsString()
  @MinLength(30)
  @IsNotEmpty()
  title: string

  @IsEmail()
  @IsNotEmpty()
  description: string
}
