import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    title: String,
    value: String,
    percentage: Number,
});

export default mongoose.models.Data || mongoose.model('Data', DataSchema);
