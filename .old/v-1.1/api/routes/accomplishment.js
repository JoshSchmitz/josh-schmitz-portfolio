import express from 'express';
import {
  getAccomplishment,
  createAccomplishment,
  updateAccomplishment,
  deleteAccomplishment,
} from '../controllers/accomplishment.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getAccomplishment).post(protect, createAccomplishment);
router
  .route('/:accomplishmentId')
  .get(getAccomplishment)
  .put(protect, updateAccomplishment)
  .delete(protect, deleteAccomplishment);

export default router;
