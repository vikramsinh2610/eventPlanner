const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config/config');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/event', eventRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
