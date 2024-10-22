import mongoose from "mongoose";

const BestSchema = new mongoose.Schema({
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
});

export default mongoose.models.Best || mongoose.model("Best", BestSchema);
