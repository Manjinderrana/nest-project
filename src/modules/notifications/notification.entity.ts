import { IsNotEmpty, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateUserEntity {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  userId: string | ObjectId
}
