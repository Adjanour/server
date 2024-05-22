import express from 'express';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import routes from './routes'
import AppError from './utils/AppError';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/", routes);

// Error handling middleware
// Catch-all route to handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandler);

export default app;
