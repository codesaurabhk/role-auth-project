const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

const {
  getPermissions,
  updateUserPermissions
} = require('../controllers/permissionController');


router.get('/:userId/permissions', getPermissions);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // returns all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.put('/:userId/permissions', updateUserPermissions);

module.exports = router;




