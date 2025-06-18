const User = require('../models/User');

exports.getPermissions = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ permissions: user.permissions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setPermissions = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      permissions: req.body.permissions,
    });
    res.json({ message: 'Permissions updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  if (!Array.isArray(permissions)) {
    return res.status(400).json({ message: 'Permissions must be an array' });
  }

  const user = await User.findByIdAndUpdate(id, { permissions }, { new: true });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'Permissions updated', user });
};