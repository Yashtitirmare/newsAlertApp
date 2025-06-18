const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
  title: String,
  description: String,
  category: String,
  url: String,
  sentTo: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
