import express from 'express';
import {
  getAward,
  createAward,
  updateAward,
  deleteAward,
} from '../controllers/award.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getAward).post(protect, createAward);
router
  .route('/:awardId')
  .get(getAward)
  .put(protect, updateAward)
  .delete(protect, deleteAward);

export default router;
