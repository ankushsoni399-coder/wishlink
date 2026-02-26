const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Template = require('../models/Template');
const UserSite = require('../models/UserSite');

const JWT_SECRET = process.env.JWT_SECRET || 'wishlink-secret-key-2025';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let admin = await Admin.findOne({ email });
    
    // Create default admin if not exists
    if (!admin && email === 'admin@wishlink.com' && password === 'admin123') {
      admin = new Admin({ email, password });
      await admin.save();
    }
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get dashboard stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const totalSites = await UserSite.countDocuments();
    const verifiedSites = await UserSite.countDocuments({ paymentStatus: 'verified' });
    const pendingSites = await UserSite.countDocuments({ paymentStatus: 'pending' });
    const totalTemplates = await Template.countDocuments({ isActive: true });
    
    res.json({
      totalSites,
      verifiedSites,
      pendingSites,
      totalTemplates,
      revenue: verifiedSites * 79 // Assuming ₹79 per site
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sites
router.get('/sites', verifyAdmin, async (req, res) => {
  try {
    const sites = await UserSite.find().populate('templateId').sort('-createdAt');
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new template
router.post('/templates', verifyAdmin, async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.json({ success: true, template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete template
router.delete('/templates/:id', verifyAdmin, async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete site
router.delete('/sites/:id', verifyAdmin, async (req, res) => {
  try {
    await UserSite.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify-payment/:siteId', verifyAdmin, async (req, res) => {
  try {
    const site = await UserSite.findById(req.params.siteId);
    if (!site) return res.status(404).json({ error: 'Site not found' });
    
    site.paymentStatus = 'verified';
    await site.save();
    
    res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;