import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// Utils and Middleware
import logger from './utils/logger.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import academyRoutes from './routes/academyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. SECURITY & MIDDLEWARE
// ==========================================

// Helmet sets HTTP headers strategically to prevent common vulnerabilities
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://aspcvacademy.com',
  'https://www.aspcvacademy.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Payload Limiting
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection & XSS
app.use(mongoSanitize());
app.use(xss());

// Logger middleware for incoming requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
});

// ==========================================
// Rate Limiting (Differentiated)
// ==========================================

// Public routes: general browsing/fetching limit
const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true, 
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP to public endpoints, please try again after 15 minutes.' }
});

// Strict DB submission limit to prevent spam attacks on forms/registrations
const strictDbLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Strictly 5 form submissions allowed
  standardHeaders: true, 
  legacyHeaders: false,
  message: { error: 'You have submitted too many forms from this IP. Please try again after 15 minutes.' }
});

// Admin/API routes: more relaxed
const adminApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300, // Limit each IP to 300 requests per window
  standardHeaders: true, 
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP to admin endpoints, please try again after 15 minutes.' }
});

// ==========================================
// 2. DATABASE CONNECTION
// ==========================================
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => logger.info('✅ MongoDB connected successfully'))
    .catch((err) => logger.error(`❌ MongoDB connection error: ${err.message}`));
} else {
  logger.warn('⚠️ MONGO_URI is missing from .env, skipping database connection.');
}

// ==========================================
// 3. API VERSIONING & ROUTES
// ==========================================

// Apply strict spam protection to DB saving endpoints BEFORE default limits take over
app.post('/api/v1/contact', strictDbLimiter);
app.post('/api/v1/academy/register', strictDbLimiter);

app.use('/api/v1/', adminApiLimiter); // fallback for all other /api/v1/

// Base health route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server API v1 is running securely.' });
});

// Route Mounts (v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/academy/register', registrationRoutes); // must be mounted before /api/v1/academy (its /:id route would otherwise swallow this)
app.use('/api/v1/academy', academyRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// ==========================================
// 4. CENTRALIZED ERROR HANDLER
// ==========================================
// This must be the last middleware
app.use(errorHandler);

// ==========================================
// 5. START SERVER
// ==========================================
const server = app.listen(PORT, () => {
    logger.info(`🚀 Secure backend API v1 listening on port ${PORT}`);
    logger.info(`🌐 Allowed frontend origin: ${allowedOrigins.join(', ')}`);
});

// Handle unhandled promise rejections (Optional but good practice)
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
