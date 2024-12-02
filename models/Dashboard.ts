import mongoose, { Schema, model } from "mongoose";

export interface DashboardDocument {
    _id: string;
    userId?: mongoose.Types.ObjectId;
    totaux: number;
    customerGrowthData: string | number;
    yearlyVisitors: string | number;
    bestSelling: string | number;
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
        { label: String, value: Number }
    ],
    bestSelling: [
        { name: String, price: Number, stock: Number, sold: Number }
    ],
});

const Dashboard = mongoose.models.Dashboard || model<DashboardDocument>("Dashboard", DashboardSchema);
export default Dashboard;