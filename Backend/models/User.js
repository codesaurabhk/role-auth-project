// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   role: String,
//   permissions: [String], // e.g., ["CREATE_USER", "VIEW_ORDER"]
// });

// module.exports = mongoose.model('User', userSchema);


// // routes/permissions.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Get all possible permissions (could be stored in DB too)
// const ALL_PERMISSIONS = [
//   "CREATE_USER", "UPDATE_USER", "DELETE_USER", "VIEW_USER",
//   "CREATE_ROLE", "UPDATE_ROLE", "DELETE_ROLE", "VIEW_ROLE",
//   "MANAGE_PERMISSIONS",
//   "CREATE_PRODUCT", "UPDATE_PRODUCT", "DELETE_PRODUCT", "VIEW_PRODUCT",
//   "CREATE_ORDER", "UPDATE_ORDER", "DELETE_ORDER", "VIEW_ORDER",
//   "CREATE_SUPPLIER", "UPDATE_SUPPLIER", "DELETE_SUPPLIER", "VIEW_SUPPLIER",
//   "VIEW_REPORTS", "VIEW_STOCK_LEVEL", "ORDER_STOCK", "VIEW_INVENTORY_REPORTS"
// ];

// // GET /api/permissions - list all permissions
// router.get('/permissions', (req, res) => {
//   res.json(ALL_PERMISSIONS);
// });

// // GET /api/users/:id/permissions - get user permissions
// router.get('/users/:id/permissions', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user.permissions || []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // PUT /api/users/:id/permissions - assign/update permissions
// router.put('/users/:id/permissions', async (req, res) => {
//   const { permissions } = req.body;
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { permissions },
//       { new: true }
//     );
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


// // server.js (or app.js)
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const permissionsRoutes = require('./routes/permissions');

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/inventoryMS', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"));

// app.use('/api', permissionsRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  permissions: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 
