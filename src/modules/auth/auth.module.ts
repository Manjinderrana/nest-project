import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserSchema } from '../../schema/user.schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
