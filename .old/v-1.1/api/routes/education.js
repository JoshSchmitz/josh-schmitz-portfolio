import express from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getEducation).post(protect, createEducation);
router
  .route('/:educationId')
  .get(getEducation)
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;
