import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import { AppError } from './utils/AppError';
dotenv.config();
import indexRoutes from './routes/index';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use(cors());

app.use('/api', indexRoutes);

app.get('/test', (req: Request | any, res: Response | any) => {
  return res.status(200).json({
    status: false,
    message: "Unable to load patient tracker"
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
