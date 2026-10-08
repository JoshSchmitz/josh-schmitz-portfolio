import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get Resume for user
    @route: GET /api/resume/(/user/:userId or :resumeId)
    @access: public
*/
const getResume = asyncHandler(async (req, res) => {
  const { resumeId, userId } = req.params;
  if (resumeId) {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      res.status(200).json({
        _id: resume._id,
        user: resume.user,
        title: resume.title,
        bio: resume.bio,
        main: resume.main,
        experienceCount: resume.experience.length,
        educationCount: resume.education.length,
        skillCount: resume.skill.length,
        leadershipCount: resume.leadership.length,
        accomplishmentCount: resume.accomplishment.length,
        awardCount: resume.award.length,
        groupCount: resume.group.length,
        languageCount: resume.language.length,
        projectCount: resume.project.length,
      });
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }

  if (userId) {
    const resumes = await Resume.find({ user: userId });
    if (resumes) {
      res.status(200).json(
        resumes.map((resume) => {
          return {
            _id: resume._id,
            user: resume.user,
            title: resume.title,
            bio: resume.bio,
            main: resume.main,
            experienceCount: resume.experience.length,
            educationCount: resume.education.length,
            skillCount: resume.skill.length,
            leadershipCount: resume.leadership.length,
            accomplishmentCount: resume.accomplishment.length,
            awardCount: resume.award.length,
            groupCount: resume.group.length,
            languageCount: resume.language.length,
            projectCount: resume.project.length,
          };
        })
      );
    } else {
      res.status(404);
      throw new Error('Resumes not found');
    }
  }
});

/* 
    @desc: Create Resume
    @route: POST /api/resume/
    @access: private
*/
const createResume = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { title, bio, main } = req.body;
  const resume = await Resume.create({ user: userId, title, bio, main });
  if (resume) {
    res.status(200).json({
      note: 'Resume created',
      _id: resume._id,
      title: resume.title,
      bio: resume.bio,
      main: resume.main,
      createdAt: resume.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid resume data');
  }
});

/* 
    @desc: Update Resume
    @route: PUT /api/resume/:resumeId
    @access: private
*/
const updateResume = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    resume.title = req.body.title || resume.title;
    resume.bio = req.body.bio || resume.bio;
    resume.main = req.body.main;
    const updatedResume = await resume.save();
    if (updatedResume) {
      res.status(200).json({
        note: 'Resume updated',
        title: updatedResume.title,
        bio: updatedResume.bio,
        main: updatedResume.main,
        updatedAt: updatedResume.updatedAt,
      });
    } else {
      res.status(400);
      throw new Error('Could not update resume');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete Resume
    @route: DELETE /api/resume/:resumeId
    @access: private
*/
const deleteResume = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.deleteOne({ _id: resumeId });
  if (resume) {
    res.status(200).json({ message: 'Resume deleted', _id: resumeId });
  } else {
    res.status(400);
    throw new Error('Could not delete resume');
  }
});

export { getResume, createResume, updateResume, deleteResume };
