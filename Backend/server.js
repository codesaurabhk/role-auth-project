const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const permissionRoutes = require('./routes/permissions');
const authRoutes = require('./routes/auth');
// require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/permissions',permissionRoutes);

mongoose.connect('mongodb+srv://saurabhkumar20843:saurabh@cluster0.h3iripa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB Error:', err));

app.use('/api', permissionRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
