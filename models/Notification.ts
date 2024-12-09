import mongoose, { Schema, model } from "mongoose";

export interface NotificationsDocument {
    _id: string;
    userId?: mongoose.Types.ObjectId;
    notifications: [];
    createdAt: Date;
    updatedAt: Date;
}

const NotificationsSchema = new Schema<NotificationsDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    notifications: [],
}, {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
});

const Notification = mongoose.models.Notification || model<NotificationsDocument>("Notification", NotificationsSchema);
export default Notification;