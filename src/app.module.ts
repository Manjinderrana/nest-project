import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    AuthModule,
    PostModule,
    UserModule],
})

export class AppModule {}
