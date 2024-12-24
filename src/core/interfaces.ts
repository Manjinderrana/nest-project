export declare class CreateUserDTO extends DTO implements CreateUser {
  _id: string
  email: string
  username: string
  password: string
  refreshToken?: string
}

export declare abstract class DTO {}

export declare class LoginUserDTO {
  email: string
  password: string
}

export interface INotifications {
  _id: string | ObjectId
  message: string
  type: string
  userId: string | ObjectId
}

export interface createNotification {
  message: string
  type: string
  userId: string | ObjectId
}

export interface CreateUser {
  _id: string
  username: string
  email: string
  password: string
  refreshToken?: string
}

export interface CreatePost {
  _id: string
  title: string
  description: string
  author: string | ObjectId
}

export interface LoginUser {
  email: string
  password: string
}

import { Document, ObjectId } from 'mongoose'
export interface IUser extends Document {
  username: string
  email: string
  password: string
  refreshToken: string
  posts: ObjectId | string[]
}

export interface IPost extends Document {
  title: string
  description: string
  author: ObjectId | string
}

export type Repository = {
  list(options: any): Promise<void>
  retrieve(id: string): Promise<void>
  create(item: any): Promise<void>
  delete(_id: string): Promise<void>
}
