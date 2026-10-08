import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// import db connection
import connectDB from './config/db.js';

// import routes
import userRoutes from './routes/user.js';
import resumeRoutes from './routes/resume.js';
import experienceRoutes from './routes/experience.js';

// import middleware
import { notFound, errorHandler } from './middleware/errors.js';

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 6000;
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/resume', resumeRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

// start server
app.listen(port, () => console.log(`Server started on port ${port}`));
