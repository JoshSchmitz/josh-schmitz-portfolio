import express from 'express';
import {
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skill.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getSkill).post(protect, createSkill);
router
  .route('/:skillId')
  .get(getSkill)
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

export default router;
