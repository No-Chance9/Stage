import mongoose from 'mongoose';

const OverviewSchema = new mongoose.Schema({
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
});

export default mongoose.models.Overview || mongoose.model('Overview', OverviewSchema);
