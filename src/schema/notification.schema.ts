import mongoose from 'mongoose'
import { INotifications } from 'src/core/interfaces'

export const NotificationSchema = new mongoose.Schema<INotifications>(
  {
    message: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
