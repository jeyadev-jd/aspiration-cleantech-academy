import express from 'express';
import {
  getServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protectAdmin, upload.single('image'), createService);

router.get('/all', protectAdmin, getAllServicesAdmin);

router.route('/:id')
  .get(getServiceById)
  .put(protectAdmin, upload.single('image'), updateService)
  .delete(protectAdmin, deleteService);

export default router;
