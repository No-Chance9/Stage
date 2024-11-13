// models/ProfilePicture.ts
import mongoose, { Schema, model } from 'mongoose';

export interface ProfilePictureDocument {
    _id: string;
    fileName: string;
    path: string;
    uploadDate: Date;
    description?: string;
}

const ProfilePictureSchema = new mongoose.Schema<ProfilePictureDocument>({
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    description: { type: String },
});

const ProfilePicture = mongoose.models?.ProfilePicture || model<ProfilePictureDocument>('ProfilePicture', ProfilePictureSchema);
export default ProfilePicture;
