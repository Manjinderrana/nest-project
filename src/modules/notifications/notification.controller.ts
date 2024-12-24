import { INotifications } from "src/core/interfaces";
import { NotificationService } from "./notification.service";
import { ObjectId } from "mongoose";

export class NotificationController {
    constructor (private readonly notificationService: NotificationService) {}

    async createNotification(data: INotifications) {
        return this.notificationService.createNotification(data)
    }

    async getNotification (_id: string | ObjectId) {
        return this.notificationService.getNotification(_id)
    }

    async getAllNotifications (userId: string | ObjectId) {
        return this.notificationService.getAllNotifications(userId)
    }
}