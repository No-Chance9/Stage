import mongoose, { Schema, model } from "mongoose";

export interface OverviewDocument {
  _id: string;
  title: string;
  value: string;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const OverviewSchema = new Schema<OverviewDocument>({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
},
  {
    timestamps: true,
  }
);

const Overview = mongoose.models?.Overview || model<OverviewDocument>('Overview', OverviewSchema);
export default Overview;
