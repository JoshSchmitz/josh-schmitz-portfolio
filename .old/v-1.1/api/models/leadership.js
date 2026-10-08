import mongoose from 'mongoose';

const leadershipSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  date: { type: String, required: true },
  highlighted: { type: Boolean, required: true },
});

export default leadershipSchema;
