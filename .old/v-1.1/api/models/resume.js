import mongoose from 'mongoose';

// import sub-models
import experienceSchema from './experience.js';
import educationSchema from './education.js';
import skillSchema from './skill.js';
import leadershipSchema from './leadership.js';
import awardSchema from './award.js';
import groupSchema from './group.js';
import languageSchema from './language.js';
import projectSchema from './project.js';
import accomplishmentSchema from './accomplishment.js';

const resumeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skill: [skillSchema],
    leadership: [leadershipSchema],
    award: [awardSchema],
    group: [groupSchema],
    language: [languageSchema],
    project: [projectSchema],
    accomplishment: [accomplishmentSchema],
    main: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
