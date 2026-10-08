import mongoose from 'mongoose';

const accomplishmentSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  icon: { type: String, required: true },
  highlighted: { type: Boolean, required: true },
});

export default accomplishmentSchema;
