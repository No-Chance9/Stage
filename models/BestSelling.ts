import mongoose, { Schema, model } from "mongoose";

export interface BestDocument {
    _id: string;
    name: string;
    price: string;
    sold: string;
    status: string;
    statusColor: string;
    createdAt: Date;
    updatedAt: Date;
}

const BestSchema = new Schema<BestDocument>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    sold: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    statusColor: {
        type: String,
        required: true,
    },
});

const Best = mongoose.models?.Best || model<BestDocument>('Best', BestSchema);
export default Best;

