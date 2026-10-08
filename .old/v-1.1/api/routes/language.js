import express from 'express';
import {
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from '../controllers/language.js';
import { protect } from '../middleware/authenticate.js';

// instatiate router
const router = express.Router({ mergeParams: true });

// routes
router.route('/').get(getLanguage).post(protect, createLanguage);
router
  .route('/:languageId')
  .get(getLanguage)
  .put(protect, updateLanguage)
  .delete(protect, deleteLanguage);

export default router;
