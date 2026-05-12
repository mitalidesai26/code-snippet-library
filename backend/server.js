require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const snippetRoutes = require('./routes/snippets');
const userSnippetRoutes = require('./routes/userSnippets');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

// 🔥 DEBUG (optional but helpful)
console.log("MONGO URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ MongoDB connected');
  console.log('DB STATE:', mongoose.connection.readyState); // should be 1

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection FAILED');
  console.error(err.message);
});

// ✅ Routes (AFTER middleware, BEFORE usage is fine)
app.use('/api/auth', authRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/user-snippets', userSnippetRoutes);