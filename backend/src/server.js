const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const app = express();
const authRoutes = require('./routes/auth.routes');
const memberRoutes = require('./routes/member.routes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SocietyHub Backend is Running 🚀'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});