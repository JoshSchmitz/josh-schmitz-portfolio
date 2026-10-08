import express from 'express';
import {
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} from '../controllers/group.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getGroup).post(protect, createGroup);
router
  .route('/:groupId')
  .get(getGroup)
  .put(protect, updateGroup)
  .delete(protect, deleteGroup);

export default router;
