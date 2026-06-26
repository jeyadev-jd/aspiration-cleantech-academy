import express from 'express';
import {
  getAcademyCourses,
  getAllAcademyAdmin,
  createAcademyCourse,
  updateAcademyCourse,
  deleteAcademyCourse
} from '../controllers/academyController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAcademyCourses)
  .post(protectAdmin, upload.single('image'), createAcademyCourse);

router.get('/all', protectAdmin, getAllAcademyAdmin);

router.route('/:id')
  .put(protectAdmin, upload.single('image'), updateAcademyCourse)
  .delete(protectAdmin, deleteAcademyCourse);

export default router;
