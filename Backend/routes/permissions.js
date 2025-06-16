const express = require('express');
const router = express.Router();
const User = require('../models/User');

const ALL_PERMISSIONS = [
  "CREATE_USER", "UPDATE_USER", "DELETE_USER", "VIEW_USER",
  "CREATE_ROLE", "UPDATE_ROLE", "DELETE_ROLE", "VIEW_ROLE",
  "MANAGE_PERMISSIONS",
  "CREATE_PRODUCT", "UPDATE_PRODUCT", "DELETE_PRODUCT", "VIEW_PRODUCT",
  "CREATE_ORDER", "UPDATE_ORDER", "DELETE_ORDER", "VIEW_ORDER",
  "CREATE_SUPPLIER", "UPDATE_SUPPLIER", "DELETE_SUPPLIER", "VIEW_SUPPLIER",
  "VIEW_REPORTS", "VIEW_STOCK_LEVEL", "ORDER_STOCK", "VIEW_INVENTORY_REPORTS"
];

// GET /api/permissions - Get all permissions
router.get('/permissions', (req, res) => {
  res.json(ALL_PERMISSIONS);
});

// GET /api/users/:id/permissions - Get permissions for a user
router.get('/users/:id/permissions', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.permissions || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id/permissions - Assign/Update permissions for a user
router.put('/users/:id/permissions', async (req, res) => {
  const { permissions } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message }) ;
       console.log(err); 
  
  }
});

module.exports = router;
