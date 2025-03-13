import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the event management for SCD Task 8');
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});