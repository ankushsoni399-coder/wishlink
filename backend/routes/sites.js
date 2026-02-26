const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const UserSite = require('../models/UserSite');
const Template = require('../models/Template');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Verify secret code
router.post('/verify-code', async (req, res) => {
  try {
    const { code } = req.body;
    const validCode = 'PAPAJII';
    
    if (code === validCode) {
      res.json({ valid: true, message: 'Code verified successfully!' });
    } else {
      res.json({ valid: false, message: 'Invalid code' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new site
router.post('/create', upload.array('images', 10), async (req, res) => {
  try {
    const { templateId, userData, usedCode, secretCode } = req.body;
    
    // Parse userData if it's a string
    const parsedUserData = typeof userData === 'string' ? JSON.parse(userData) : userData;
    
    // Generate unique slug
    const slug = `${parsedUserData.yourName}-${parsedUserData.partnerName}-${uuidv4().substring(0, 8)}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');
    
    // Get uploaded image paths
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    // Determine payment status
    let paymentStatus = 'pending';
    if (usedCode === 'true' && secretCode === 'PAPAJII') {
      paymentStatus = 'verified';
    }
    
    const newSite = new UserSite({
      templateId,
      slug,
      userData: parsedUserData,
      images,
      paymentStatus,
      usedCode: usedCode === 'true',
      secretCode: usedCode === 'true' ? secretCode : null
    });
    
    await newSite.save();
    
    res.json({
      success: true,
      siteId: newSite._id,
      slug: newSite.slug,
      paymentStatus: newSite.paymentStatus
    });
  } catch (error) {
    console.error('Create site error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get site by slug
router.get('/view/:slug', async (req, res) => {
  try {
    const site = await UserSite.findOne({ slug: req.params.slug }).populate('templateId');
    if (!site) return res.status(404).json({ error: 'Site not found' });
    
    if (site.paymentStatus !== 'verified') {
      return res.status(403).json({ error: 'Payment pending or rejected' });
    }
    
    res.json(site);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check slug availability
router.get('/check-slug/:slug', async (req, res) => {
  try {
    const exists = await UserSite.findOne({ slug: req.params.slug });
    res.json({ available: !exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;