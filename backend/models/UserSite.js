const mongoose = require('mongoose');

const userSiteSchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  slug: { type: String, required: true, unique: true },
  userData: {
    yourName: String,
    partnerName: String,
    relationshipDate: String,
    loveMessage: String,
    favoriteSong: String,
    customMessage: String,
    password: String
  },
  images: [String],
  paymentStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  transactionId: String,
  paymentScreenshot: String,
  usedCode: { type: Boolean, default: false },
  secretCode: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserSite', userSiteSchema);