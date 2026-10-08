import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: String, required: true },
  endDate: String,
  position: [
    {
      title: { type: String, requred: true },
      startDate: { type: String, required: true },
      endDate: String,
    },
  ],
  highlighted: { type: Boolean, required: true },
});

export default groupSchema;
