import express from 'express';
import {
  getLeadership,
  createLeadership,
  updateLeadership,
  deleteLeadership,
} from '../controllers/leadership.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getLeadership).post(protect, createLeadership);
router
  .route('/:leadershipId')
  .get(getLeadership)
  .put(protect, updateLeadership)
  .delete(protect, deleteLeadership);

export default router;
