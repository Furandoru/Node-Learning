const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  bedrooms: Number,
  sqm: Number,
  location: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Property', propertySchema);