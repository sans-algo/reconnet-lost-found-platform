const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User Schema - structure of user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true // Removes extra spaces
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // No duplicate emails
    lowercase: true, // Converts to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Email validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware: Hash password before saving to database
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);