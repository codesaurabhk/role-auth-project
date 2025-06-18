const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const permissionRoutes = require('./routes/permissions');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/user'));

app.use('/api/auth', authRoutes);
app.use('/api/permissions',permissionRoutes);

mongoose.connect('mongodb+srv://adityanetario:863ZKSxWvS69udGM@cluster0.zsyxdso.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB Error:', err));

app.use('/api', permissionRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

