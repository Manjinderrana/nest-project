import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateUserEntity {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
