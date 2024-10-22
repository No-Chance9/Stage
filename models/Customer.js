import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
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
});

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
