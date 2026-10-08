import mongoose from 'mongoose';

const educationSchema = mongoose.Schema({
  degree: { type: String, required: true },
  majors: [{ title: { type: String, required: true } }],
  majorCount: { type: Number, default: 0 },
  minors: [{ title: { type: String, required: true } }],
  minorCount: { type: Number, default: 0 },
  institution: {
    name: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postcode: { type: String, required: true },
    },
    phone: { type: String },
  },
  startDate: { type: String, required: true },
  endDate: String,
  gpa: { type: Number, default: 0 },
  highlighted: { type: Boolean, required: true },
});

export default educationSchema;
