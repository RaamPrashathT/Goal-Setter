const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  heading: {
    type: String,
    required: [true, 'Please add a heading'],
    trim: true,
    maxlength: [100, 'Heading cannot be more than 100 characters'],
  },
  body: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Body cannot be more than 500 characters'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);