// routes/user.js
const express = require('express');
const router = express.Router();

const {
  getPermissions,
  updateUserPermissions
} = require('../controllers/permissionController');

// Get user permissions
router.get('/:userId/permissions', getPermissions);

// ✅ Update user permissions (this is the line you're asking about)
router.put('/:userId/permissions', updateUserPermissions);

module.exports = router;
