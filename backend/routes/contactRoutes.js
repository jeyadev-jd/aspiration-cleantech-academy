import express from 'express';
import { body, validationResult } from 'express-validator';
import { submitContactForm, getLeads, deleteAllLeads } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.route('/')
  .post([
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('message').notEmpty().withMessage('Message is required').trim().escape()
  ], validateFields, submitContactForm)
  .get(protectAdmin, getLeads)
  .delete(protectAdmin, deleteAllLeads);

export default router;
