import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
    _id: string;
    email: string;
    role: string;
    password: string;
    name: string;
    surname: string;
    phone: number;
    avatar: string;
    adresse: string;
    ville: string;
    code: number;
    dashboard?: mongoose.Types.ObjectId
    profilePicture?: mongoose.Types.ObjectId ;
    notification?: mongoose.Types.ObjectId;
    resetPasswordToken: string;
    resetPasswordExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
        validate: {
            validator: (value: string) => value.trim().length > 0, // Empêche les espaces uniquement
            message: "Email cannot be empty or only spaces",
        },
    },
    role: {
        type: String,
        default: 'User',
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"], // Minimum 8 characters
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.",
        ],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        validate: {
            validator: (value: string) => value.trim().length > 0, // Empêche les espaces uniquement
            message: "Name cannot be empty or only spaces",
        },
        maxlength: [15, "Name can't be longer than 15 characters "], // Max 15 characters

    },
    surname: {
        type: String,
        maxlength: [15, "Surname can't be longer than 15 characters "], // Max 15 characters
    },
    phone: {
        type: Number,
    },
    avatar: {
        type: String,
    },
    adresse: {
        type: String,
        maxlength: [50, "adresse can't be longer than 50 characters "], // Max 50 characters

    },
    ville: {
        type: String,
        maxlength: [30, "adresse can't be longer than 30 characters "], // Max 30 characters
    },
    code: {
        type: Number,
        maxlength: [10, "adresse can't be longer than 10 characters "], // Max 10 characters

    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfilePicture',
        default: null,
    }, // Référence à une image
    dashboard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dashboard',
    },//Ref du dashboard perso
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notification',
    },//Ref du dashboard perso
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
    }, // Soft delete flag
}, {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
});

// Exporter le modèle
const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;