import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema({
  position: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postcode: { type: String, required: true },
    },
    phone: { type: String, required: true },
  },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: String,
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skills' }],
  highlighted: { type: Boolean, required: true },
});

export default experienceSchema;
