const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Documents', 'Accessories', 'Clothing', 'Others']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['lost', 'found'],
    lowercase: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  // NEW: Image field (stores base64 string)
  image: {
    type: String,
    default: null
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required']
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);