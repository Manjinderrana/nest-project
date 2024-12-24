import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreatePost, IPost } from 'src/core/interfaces'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) { }
  async create(body: CreatePost): Promise<any> {
    try {
      const { title, description, author } = body

      if (!title || !description) {
        throw new BadRequestException('All fields are required')
      }

      const existingPost = await this.postModel.findOne({ title })

      if (existingPost) {
        throw new ConflictException('Post with title already exists')
      }

      return await this.postModel.create({
        title,
        description,
        author,
      })
    } catch (error) {
      Logger.error(error.message, 'PostService')
      throw new BadRequestException(error?.message)
    }
  }

  async getPost(body: Partial<IPost>): Promise<any> {
    try {
      const { _id } = body

      const post = await this.postModel.findById({ _id: _id })

      if (!post) {
        throw new NotFoundException('Post not found')
      }

      return post
    } catch (error) {
      throw new BadRequestException(error?.message)
    }
  }

  async updatePost(_id: string | ObjectId, body: Partial<IPost>): Promise<any> {
    try {
      const { title, description } = body

      if (!title || !description) {
        throw new BadRequestException('All fields are required')
      }

      const existingPost = await this.postModel.findById(_id)

      if (!existingPost) {
        throw new NotFoundException('Post not found')
      }

      existingPost.title = title
      existingPost.description = description

      existingPost.save()

      return existingPost
    } catch (error) {
      throw new BadRequestException(error?.message)
    }
  }

  async deletePost(_id: string | ObjectId): Promise<any> {
    try {
      const post = await this.postModel.findByIdAndDelete(_id)

      if (!post) {
        throw new NotFoundException('Post not found')
      }

      return post
    } catch (error) {
      throw new BadRequestException(error?.message)
    }
  }

  async getPostsByCategory(category: string): Promise<any> {
    try {
      const posts = await this.postModel.find({ category })

      if (posts?.length === 0) {
        throw new NotFoundException('No Post Data found')
      }

      return posts
    } catch (error) {
      throw new BadRequestException(error?.message)
    }
  }
}
