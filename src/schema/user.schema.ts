import mongoose from 'mongoose'
import { IUser } from 'src/core/interfaces'

export const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)
