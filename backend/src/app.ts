import express from 'express';
import cors from 'cors';
import applicationRoutes from './modules/application/application.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Mini Job Application Tracker API is running' });
});

// Register module routes
app.use('/applications', applicationRoutes);

// Register centralized error handling 
app.use(errorHandler);

export default app;
