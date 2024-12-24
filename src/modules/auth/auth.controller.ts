import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { IUser, LoginUserDTO } from 'src/core/interfaces'
import { CreateUserEntity } from './auth.entity'
import { CommonCRUD } from '../common/common.controller'

@Controller('auth')
export class AuthController extends CommonCRUD {
  constructor(private readonly authService: AuthService) {
    super(authService)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() body: any): Promise<CreateUserEntity> {
    return this.authService.signup(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginUserDTO): Promise<IUser> {
    return this.authService.login(body)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    return this.authService.getUser({ id })
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateUser(@Param('id') id: string): Promise<IUser> {
    return this.authService.updateUser({ id })
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id)
  }
}
