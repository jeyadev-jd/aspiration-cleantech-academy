import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { loginAdmin } from '../controllers/authController.js';

const router = express.Router();

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Strict brute-force protection on login: far tighter than the general admin API limiter.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts from this IP. Please try again after 15 minutes.' }
});

router.post('/login', loginLimiter, [
  body('email').notEmpty().withMessage('Username/Email is required').trim(),
  body('password').notEmpty().withMessage('Password is required')
], validateFields, loginAdmin);

export default router;
