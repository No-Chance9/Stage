import mongoose from "mongoose";

const YearlySchema = new mongoose.Schema({
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

export default mongoose.models.Yearly || mongoose.model("Yearly", YearlySchema);
