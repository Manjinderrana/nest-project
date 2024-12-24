import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  HttpCode,
  Put,
  Param,
} from '@nestjs/common'
import { PostService } from './post.service'
import { IPost } from 'src/core/interfaces'
import { CreateUserEntity } from './post.entity'
import { ObjectId } from 'mongoose'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createPost(@Body() body: any): Promise<CreateUserEntity> {
    return this.postService.create(body)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':_id')
  async getPost(@Body() body: IPost): Promise<IPost> {
    return this.postService.getPost(body)
  }

  @HttpCode(HttpStatus.OK)
  @Put(':_id')
  async(
    @Param() _id: string | ObjectId,
    @Body() body: Partial<IPost>,
  ): Promise<any> {
    return this.postService.updatePost(_id, body)
  }
}
