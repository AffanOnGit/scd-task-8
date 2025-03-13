import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

config();

const dbURL = process.env.MONGO_URI;
const app = express();

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
const port = process.env.PORT ?? 3000;

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the event management for SCD Task 8');
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});