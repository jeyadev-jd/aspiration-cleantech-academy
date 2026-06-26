import express from 'express';
import { body, validationResult } from 'express-validator';
import { submitRegistration, getRegistrations, deleteAllRegistrations } from '../controllers/registrationController.js';
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
    body('phone').notEmpty().withMessage('Phone is required').trim().escape(),
    body('courseName').notEmpty().withMessage('Course Name is required').trim().escape()
  ], validateFields, submitRegistration)
  .get(protectAdmin, getRegistrations)
  .delete(protectAdmin, deleteAllRegistrations);

export default router;
