import mongoose from 'mongoose';

const awardSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  icon: { type: String, required: true },
  highlighted: { type: Boolean, required: true },
});

export default awardSchema;
