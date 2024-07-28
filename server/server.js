const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const storeRoutes = require('./routes/store');
const ratingRoutes = require('./routes/ratings');

app.use('/api/auth', authRoutes); 
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
