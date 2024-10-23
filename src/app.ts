import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import { AppError } from './utils/AppError';
dotenv.config();
import indexRoutes from './routes/index';


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use('/api', indexRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
