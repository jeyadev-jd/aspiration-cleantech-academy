import Lead from '../models/Lead.js';

// @desc    Submit a new lead
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message, sourcePage } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      res.status(400);
      return next(new Error('Please provide all required fields'));
    }

    const lead = new Lead({ name, email, message, sourcePage });
    await lead.save();

    res.status(201).json({ message: 'Thank you! Your message has been received.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads
// @route   GET /api/contact
// @access  Private/Admin
export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete all leads
// @route   DELETE /api/contact
// @access  Private/Admin
export const deleteAllLeads = async (req, res, next) => {
  try {
    const result = await Lead.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} leads.` });
  } catch (error) {
    next(error);
  }
};
