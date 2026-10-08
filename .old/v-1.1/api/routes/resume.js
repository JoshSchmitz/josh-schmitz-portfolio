import express from 'express';
import {
  getResume,
  createResume,
  updateResume,
  deleteResume,
} from '../controllers/resume.js';
import { protect } from '../middleware/authenticate.js';
import accomplishmentRoutes from './accomplishment.js';
import awardRoutes from './award.js';
import educationRoutes from './education.js';
import experienceRoutes from './experience.js';
import groupRoutes from './group.js';
import languageRoutes from './language.js';
import projectRoutes from './project.js';
import skillRoutes from './skill.js';
import leadershipRoutes from './leadership.js';

// instantiate router
const router = express.Router();

// routes
router.route('/user/:userId').get(getResume).post(protect, createResume);
router
  .route('/:resumeId')
  .get(getResume)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

// nest routes
router
  .use('/:resumeId/accomplishment', accomplishmentRoutes)
  .use('/:resumeId/award', awardRoutes)
  .use('/:resumeId/education', educationRoutes)
  .use('/:resumeId/experience', experienceRoutes)
  .use('/:resumeId/group', groupRoutes)
  .use('/:resumeId/language', languageRoutes)
  .use('/:resumeId/leadership', leadershipRoutes)
  .use('/:resumeId/project', projectRoutes)
  .use('/:resumeId/skill', skillRoutes);

export default router;
