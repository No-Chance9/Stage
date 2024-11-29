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
    unique: true,
  },
  type: {
    type: String,
    default: 'Visitors',
  },
  value: {
    type: Number,
    required: true,
  },
},{
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
});

// Middleware pour convertir `label` en minuscule avant de sauvegarder
YearlySchema.pre("save", function (next) {
  this.label = this.label.toLowerCase(); // Convertit en minuscule
  next();
});

const Yearly = mongoose.models?.Yearly || model<YearlyDocument>('Yearly', YearlySchema);
export default Yearly;
