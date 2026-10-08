import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get award for resume
    @route: GET /api/resume/:resumeId/award(/:awardId)
    @access: public
*/
const getAward = asyncHandler(async (req, res) => {
  const { resumeId, awardId } = req.params;
  if (awardId) {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const awards = resume.award;
      const award = awards.filter((aw) => aw._id.valueOf() === awardId);
      if (award) {
        res.status(200).json(award[0]);
      } else {
        res.status(404);
        throw new Error('Award not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const awards = resume.award;
      if (awards) {
        res.status(200).json(awards);
      } else {
        res.status(404);
        throw new Error('Awards not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create award
    @route: POST /api/resume/:resumeId/award
    @access: private
*/
const createAward = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let awards = resume.award;
    awards.push({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      icon: req.body.icon,
      highlighted: req.body.highlighted,
    });
    resume.award = awards;
    await resume.save();
    res.status(200).json({ message: 'Award created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update award
    @route: PUT /api/resume/:resumeId/award/:awardId
    @access: private
*/
const updateAward = asyncHandler(async (req, res) => {
  const { resumeId, awardId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const awards = resume.award;
    const [award] = awards.filter((aw) => aw._id.valueOf() === awardId);
    if (award) {
      award.title = req.body.title || award.title;
      award.description = req.body.description || award.description;
      award.date = req.body.date ? req.body.date : '';
      award.icon = req.body.icon || award.icon;
      award.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedAwards = updatedResume.award;
      const [updatedAward] = updatedAwards.filter(
        (aw) => aw._id.valueOf() === awardId
      );
      res.status(200).json({
        title: updatedAward.title,
        description: updatedAward.description,
        date: updatedAward.date,
        icon: updatedAward.icon,
        highlighted: updatedAward.highlighted,
      });
    } else {
      res.status(400);
      throw new Error('Award not found');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete award
    @route: DELETE /api/resume/:resumeId/award/:awardId
    @access: private
*/
const deleteAward = asyncHandler(async (req, res) => {
  const { resumeId, awardId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const awards = resume.award;
    awards.pull(awardId);
    const updatedAward = await resume.save();
    if (updatedAward) {
      res.status(200).json({ message: 'Award deleted', _id: awardId });
    } else {
      res.status(400);
      throw new Error('Could not delete award');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

export { getAward, createAward, updateAward, deleteAward };
