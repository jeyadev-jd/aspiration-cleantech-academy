import Academy from '../models/Academy.js';
import logger from '../utils/logger.js';

// @desc    Get all published academy courses
// @route   GET /api/v1/academy
// @access  Public
export const getAcademyCourses = async (req, res, next) => {
  try {
    const courses = await Academy.find({ isPublished: true }).sort({ createdAt: -1 });
    
    // Set 5 min cache
    res.set("Cache-Control", "public, max-age=300");
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all academy courses (admin)
// @route   GET /api/v1/academy/all
// @access  Private/Admin
export const getAllAcademyAdmin = async (req, res, next) => {
  try {
    const courses = await Academy.find({}).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a course
// @route   POST /api/v1/academy
// @access  Private/Admin
export const createAcademyCourse = async (req, res, next) => {
  try {
    const { title, description, price, category, isPublished } = req.body;
    
    // Cloudinary pipeline: `req.file` holds the uploaded file info if any
    const imageUrl = req.file ? req.file.path : '';

    const course = new Academy({ title, description, price, imageUrl, category, isPublished });
    const createdCourse = await course.save();

    logger.info(`Academy course created ID: ${createdCourse._id}`);
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400);
    next(new Error('Invalid create data'));
  }
};

// @desc    Update a course
// @route   PUT /api/v1/academy/:id
// @access  Private/Admin
export const updateAcademyCourse = async (req, res, next) => {
  try {
    const { title, description, price, category, isPublished } = req.body;
    const course = await Academy.findById(req.params.id);

    if (course) {
      course.title = title || course.title;
      course.description = description || course.description;
      course.price = price !== undefined ? price : course.price;
      course.category = category || course.category;
      course.isPublished = isPublished !== undefined ? isPublished : course.isPublished;

      if (req.file) {
        course.imageUrl = req.file.path;
      }

      const updatedCourse = await course.save();
      logger.info(`Academy course updated ID: ${updatedCourse._id}`);
      res.json(updatedCourse);
    } else {
      res.status(404);
      next(new Error('Course not found'));
    }
  } catch (error) {
    res.status(400);
    next(new Error('Invalid update data'));
  }
};

// @desc    Delete a course
// @route   DELETE /api/v1/academy/:id
// @access  Private/Admin
export const deleteAcademyCourse = async (req, res, next) => {
  try {
    const course = await Academy.findById(req.params.id);
    if (course) {
      await course.deleteOne();
      logger.info(`Academy course deleted ID: ${req.params.id}`);
      res.json({ message: 'Course removed' });
    } else {
      res.status(404);
      next(new Error('Course not found'));
    }
  } catch (error) {
    next(error);
  }
};
