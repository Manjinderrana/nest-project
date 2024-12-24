import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response, NextFunction } from 'express'
import { Model } from 'mongoose'
import { IUser } from 'src/core/interfaces'
import { verifyToken } from 'src/utils/jwtUtils'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async use(req: Request, _res: Response, next: NextFunction) {
    const token =
      req?.cookies?.accessToken ||
      req?.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new ConflictException('Token is missing')
    }

    const decoded = (await verifyToken(token)) as any

    const user = await this.userModel.findById({ _id: decoded?._id })

    if (user) {
      ;(req as any).user = user
      next()
    } else {
      throw new ConflictException('Error while verifying token')
    }
  }
}
