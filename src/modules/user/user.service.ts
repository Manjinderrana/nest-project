import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreateUser, IUser, LoginUser } from 'src/core/interfaces'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { hashPassword } from 'src/utils/passwordHash'
import { generateAccessToken, generateRefreshToken } from 'src/utils/jwtUtils'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async signup(body: CreateUser): Promise<any> {
    try {
      const { username, email, password } = body

      if (!username || !email || !password) {
        throw new BadRequestException('All fields are required')
      }

      const existingUser = await this.userModel.findOne({
        $or: [{ email }, { username }],
      })

      if (existingUser) {
        throw new ConflictException(
          'User with email or username already exists',
        )
      }

      const hashedPassword = await hashPassword(password)

      const user = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
      })

      return user
    } catch (error) {
      Logger.error(error.message, 'UserService')
      throw new InternalServerErrorException(error?.message)
    }
  }

  async login(body: LoginUser): Promise<any> {
    try {
      const { email, password } = body

      if (!email || !password) {
        throw new BadRequestException('All fields are required')
      }

      const existingUser = await this.userModel.findOne({
        $or: [{ email }, { password }],
      })

      if (!existingUser) {
        throw new NotFoundException('User not found')
      }

      const accessToken = generateAccessToken(existingUser)

      const refreshToken = generateRefreshToken(existingUser)

      existingUser.refreshToken = refreshToken

      await existingUser?.save()

      return { existingUser, accessToken, refreshToken }
    } catch (error) {
      Logger.error(error.message, 'UserService')
      throw new InternalServerErrorException(error?.message)
    }
  }

  async getUser(body: Partial<IUser>): Promise<any> {
    try {
      const { _id } = body

      return await this.userModel.findById({ _id: _id })
    } catch (error) {
      throw new InternalServerErrorException(error?.message)
    }
  }

  async updateUser(data: Partial<IUser>): Promise<any> {
    try {
      const { username, email } = data

      if (!username || !email) {
        throw new BadRequestException('Please provide necessary data')
      }

      const updatedUser = await this.userModel.updateOne({ email, username })

      if (!updatedUser) {
        throw new BadRequestException('Error while updating user data')
      }

      return updatedUser

    } catch (error) {
      throw new BadRequestException(error?.message)
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      if (!id) {
        throw new BadRequestException('UserId is required')
      }

      const user = await this.userModel.findByIdAndDelete({ id })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      return user
    } catch (error) {
      throw new BadRequestException(error?.message)
    }
  }
}
