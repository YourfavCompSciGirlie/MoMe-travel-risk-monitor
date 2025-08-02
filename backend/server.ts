import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import alertRoutes from './routes/alertRoutes';
import riskScoreRoutes from './routes/riskScoreRoutes';
import routeRoutes from './routes/routeRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/risk-score', riskScoreRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
