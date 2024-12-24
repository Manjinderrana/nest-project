import { Body, Controller, HttpStatus, Post, HttpCode, Param, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { IUser, LoginUserDTO } from 'src/core/interfaces'
import { CreateUserEntity } from './user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() body: any): Promise<CreateUserEntity> {
    return this.UserService.signup(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginUserDTO): Promise<IUser> {
    return this.UserService.login(body)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':_id')
  async getUser(@Param('_id') _id: string): Promise<IUser> {
    return this.UserService.getUser({_id})
  }
}