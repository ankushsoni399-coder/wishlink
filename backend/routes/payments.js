const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const UserSite = require('../models/UserSite');

// Configure multer for payment screenshots
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `payment-${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Submit payment
router.post('/submit', upload.single('screenshot'), async (req, res) => {
  try {
    const { siteId, transactionId, paymentMethod } = req.body;
    
    const site = await UserSite.findById(siteId);
    if (!site) return res.status(404).json({ error: 'Site not found' });
    
    if (paymentMethod === 'screenshot' && req.file) {
      site.paymentScreenshot = `/uploads/${req.file.filename}`;
    } else if (paymentMethod === 'transaction' && transactionId) {
      site.transactionId = transactionId;
    } else {
      return res.status(400).json({ error: 'Payment proof required' });
    }
    
    // Auto-verify for now (in production, admin would verify)
    site.paymentStatus = 'verified';
    await site.save();
    
    res.json({
      success: true,
      message: 'Payment submitted successfully',
      slug: site.slug,
      paymentStatus: site.paymentStatus
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check payment status
router.get('/status/:siteId', async (req, res) => {
  try {
    const site = await UserSite.findById(req.params.siteId);
    if (!site) return res.status(404).json({ error: 'Site not found' });
    
    res.json({
      paymentStatus: site.paymentStatus,
      slug: site.slug
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;