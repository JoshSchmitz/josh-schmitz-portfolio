import express from 'express';
import {
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getProject).post(protect, createProject);
router
  .route('/:projectId')
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
