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
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        // required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // // required: [true, "Name is required"]
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
},
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;