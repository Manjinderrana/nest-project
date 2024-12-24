import mongoose from 'mongoose'
import { IPost } from 'src/core/interfaces'

export const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
