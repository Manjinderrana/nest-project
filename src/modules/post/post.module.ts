import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostSchema } from '../../schema/post.schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {
  [x: string]: any
}
