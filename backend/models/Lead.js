import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  sourcePage: {
    type: String,
    default: 'unknown'
  }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
