import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { INotifications, createNotification } from "src/core/interfaces";

@Injectable()
export class NotificationService {
    constructor(@InjectModel('Notification') private notificationModel: Model<INotifications>) { }
    
    async createNotification (body: createNotification): Promise<INotifications> {
       try {
        const { message, userId, type } = body

        return await this.notificationModel.create({
            message,
            userId,
            type
        })

       } catch (error) {
        throw new BadRequestException(error?.message) 
       }
    }

    async getNotification (_id: string | ObjectId): Promise<INotifications> {
        try {
            const notification = await this.notificationModel.findById(_id)

            if (!notification) {
                throw new NotFoundException('Notification not found')
            }
            
            return notification

        } catch (error) {
           throw new BadRequestException(error?.message) 
        }
    }

    async getAllNotifications (userId: string | ObjectId): Promise<INotifications[]> {
        try {
            const notifications = await this.notificationModel.find({_id: userId}).populate('userId')

            if (notifications?.length === 0) {
                throw new BadRequestException('Notification data not found')
            }

            return notifications

        } catch (error) {
            throw new BadRequestException(error?.message)
        }
    }
}
