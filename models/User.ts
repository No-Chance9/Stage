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
    dashboardId?: mongoose.Types.ObjectId
    profilePicture?: mongoose.Types.ObjectId;
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
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"], // Minimum 8 characters
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        validate: {
            validator: (value: string) => value.trim().length > 0, // Empêche les espaces uniquement
            message: "Name cannot be empty or only spaces",
        },
    },
    surname: {
        type: String,
    },
    phone: {
        type: Number,
    },
    avatar: {
        type: String,
    },
    adresse: {
        type: String,
    },
    ville: {
        type: String,
    },
    code: {
        type: Number,
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfilePicture',
    }, // Référence à une image
    dashboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dashboardId',
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