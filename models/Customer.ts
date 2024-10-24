import mongoose, { Schema, model } from "mongoose";

export interface CustomerDocument {
    _id: string;
    month: string;
    menCustomer: number;
    womenCustomer: number;
    newCustomer: number;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new mongoose.Schema<CustomerDocument>({
    month: {
        type: String,
        required: true,
    },
    menCustomer: {
        type: Number,
        required: true,
    },
    womenCustomer: {
        type: Number,
        required: true,
    },
    newCustomer: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const Customer = mongoose.models?.Customer || model<CustomerDocument>('Customer', CustomerSchema);
export default Customer;
