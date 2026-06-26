import mongoose from 'mongoose';

const academySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Academy', academySchema);
