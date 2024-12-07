import mongoose, { Schema, model } from "mongoose";
import { validators } from "tailwind-merge";

export interface DashboardDocument {
    _id: string;
    userId?: mongoose.Types.ObjectId;
    totaux: number;
    customerGrowthData: string | number;
    yearlyVisitors: { label: string; value: number }[];
    bestSelling: string | number;
    createdAt: Date;
    updatedAt: Date;
}

const DashboardSchema = new Schema<DashboardDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totaux: {
        visitors: { type: Number, default: 0 },
        platforms: { type: Number, default: 0 },
    },
    customerGrowthData: [
        { month: String, newCustomer: Number }
    ],
    yearlyVisitors: [
        {
            label: { type: String, required: true, unique: true }, // Le champ est requis
            value: { type: Number, required: true }  // Le champ est requis
        }
    ],
    bestSelling: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            sold: { type: Number, required: true }
        }
    ],
}, {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
});

// Ajouter un index pour renforcer l'unicité
DashboardSchema.index({ 'yearlyVisitors.label': 1 }, { unique: true });


const Dashboard = mongoose.models.Dashboard || model<DashboardDocument>("Dashboard", DashboardSchema);
export default Dashboard;