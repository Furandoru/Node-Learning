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
  }
});

module.exports = mongoose.model('Property', propertySchema);