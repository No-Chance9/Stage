import mongoose, { Schema, model } from "mongoose";

export interface BestDocument {
    _id: string;
    name: string;
    price: number;
    sold: number;
    stock: number;
    status: string;
    statusColor: string;
    createdAt: Date;
    updatedAt: Date;
}

const BestSchema = new mongoose.Schema<BestDocument>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        required: true,
        default:0
    },
    stock: {
        type: Number, // Assurez-vous que c'est un Number
        required: true,
        min: 0, // Ne peut pas être négatif
        default:0
    },
    status: {
        type: String,
    },
    statusColor: {
        type: String,
    },
});

const Best = mongoose.models?.Best || model<BestDocument>('Best', BestSchema);
export default Best;

