const mongoose = require('mongoose');

const templatePageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  htmlContent: { type: String, required: true },
  order: { type: Number, required: true }
});

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['love', 'birthday', 'anniversary'] },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  pages: [templatePageSchema],
  videoPreview: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', templateSchema);