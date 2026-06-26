import Registration from '../models/Registration.js';
import Academy from '../models/Academy.js';
import logger from '../utils/logger.js';

// @desc    Submit a new course registration
// @route   POST /api/v1/academy/register
// @access  Public
export const submitRegistration = async (req, res, next) => {
  try {
    const { name, email, phone, courseName, message } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !courseName) {
      res.status(400);
      return next(new Error('Please provide all required fields (name, email, phone, courseName)'));
    }

    const registration = new Registration({ name, email, phone, courseName, message });
    await registration.save();
    
    logger.info(`New registration for course ${courseName} by ${email}`);
    res.status(201).json({ message: 'Registration successful! We will contact you soon.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations
// @route   GET /api/v1/academy/register
// @access  Private/Admin
export const getRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find()
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete all registrations
// @route   DELETE /api/v1/academy/register
// @access  Private/Admin
export const deleteAllRegistrations = async (req, res, next) => {
  try {
    const result = await Registration.deleteMany({});
    logger.info(`Cleared ${result.deletedCount} registrations`);
    res.json({ message: `Deleted ${result.deletedCount} registrations.` });
  } catch (error) {
    next(error);
  }
};
