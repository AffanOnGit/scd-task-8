const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Booking Service running on port ${PORT}`));