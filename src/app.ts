import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
