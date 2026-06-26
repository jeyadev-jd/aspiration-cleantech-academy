import Service from '../models/Service.js';
import logger from '../utils/logger.js';

// @desc    Get all active services (public)
// @route   GET /api/v1/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ status: 'active' }).sort({ createdAt: -1 });

    // Set 5 min cache
    res.set("Cache-Control", "public, max-age=300");
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all services including drafts (admin)
// @route   GET /api/v1/services/all
// @access  Private/Admin
export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single service by ID
// @route   GET /api/v1/services/:id
// @access  Public
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }
    // Only allow public access to active services
    if (service.status !== 'active' && (!req.user || req.user.role !== 'admin')) {
        return res.status(404).json({ error: 'Service not found or is in draft' });
    }

    res.set("Cache-Control", "public, max-age=300");
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/v1/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    // Cloudinary pipeline: `req.file` holds the uploaded file info if any
    const imageUrl = req.file ? req.file.path : '';

    const service = new Service({ title, description, imageUrl, status });
    const createdService = await service.save();

    logger.info(`Service created ID: ${createdService._id}`);
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400);
    next(new Error('Invalid data provided'));
  }
};

// @desc    Update a service
// @route   PUT /api/v1/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      service.description = description || service.description;
      service.status = status || service.status;

      if (req.file) {
        service.imageUrl = req.file.path; // update only if user uploaded a new image
      }

      const updatedService = await service.save();
      logger.info(`Service updated ID: ${updatedService._id}`);
      res.json(updatedService);
    } else {
      res.status(404);
      next(new Error('Service not found'));
    }
  } catch (error) {
    res.status(400);
    next(new Error('Invalid update data'));
  }
};

// @desc    Delete a service
// @route   DELETE /api/v1/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      await service.deleteOne();
      logger.info(`Service deleted ID: ${req.params.id}`);
      res.json({ message: 'Service removed' });
    } else {
      res.status(404);
      next(new Error('Service not found'));
    }
  } catch (error) {
    next(error);
  }
};
