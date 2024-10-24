import mongoose, { Schema, model } from "mongoose";

export interface YearlyDocument {
  _id: string;
  label: string;
  type: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const YearlySchema = new mongoose.Schema<YearlyDocument>({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Yearly = mongoose.models?.Yearly || model<YearlyDocument>('Yearly', YearlySchema);
export default Yearly;
