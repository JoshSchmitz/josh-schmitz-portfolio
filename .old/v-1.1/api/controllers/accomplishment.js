import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get accomplishment for resume
    @route: GET /api/resume/:resumeId/accomplishment(/:accomplishmentId)
    @access: public
*/
const getAccomplishment = asyncHandler(async (req, res) => {
  const { resumeId, accomplishmentId } = req.params;
  if (accomplishmentId) {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const accomplishments = resume.accomplishment;
      const accomplishment = accomplishments.filter(
        (acc) => acc._id.valueOf() === accomplishmentId
      );
      if (accomplishment) {
        res.status(200).json(accomplishment[0]);
      } else {
        res.status(404);
        throw new Error('Accomplishment not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const accomplishments = resume.accomplishment;
      if (accomplishments) {
        res.status(200).json(accomplishments);
      } else {
        res.status(404);
        throw new Error('Accomplishments not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create accomplishment
    @route: POST /api/resume/:resumeId/accomplishment
    @access: private
*/
const createAccomplishment = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let accomplishments = resume.accomplishment;
    accomplishments.push({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      icon: req.body.icon,
      highlighted: req.body.highlighted,
    });
    resume.accomplishment = accomplishments;
    await resume.save();
    res.status(200).json({ message: 'Accomplishment created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update accomplishment
    @route: PUT /api/resume/:resumeId/accomplishment/:accomplishmentId
    @access: private
*/
const updateAccomplishment = asyncHandler(async (req, res) => {
  const { resumeId, accomplishmentId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const accomplishments = resume.accomplishment;
    const [accomplishment] = accomplishments.filter(
      (acc) => acc._id.valueOf() === accomplishmentId
    );
    if (accomplishment) {
      accomplishment.title = req.body.title || accomplishment.title;
      accomplishment.description =
        req.body.description || accomplishment.description;
      accomplishment.date = req.body.date ? req.body.date : '';
      accomplishment.icon = req.body.icon || accomplishment.icon;
      accomplishment.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedAccomplishments = updatedResume.accomplishment;
      const [updatedAccomplishment] = updatedAccomplishments.filter(
        (acc) => acc._id.valueOf() === accomplishmentId
      );
      res.status(200).json({
        title: updatedAccomplishment.title,
        description: updatedAccomplishment.description,
        date: updatedAccomplishment.date,
        icon: updatedAccomplishment.icon,
        highlighted: updatedAccomplishment.highlighted,
      });
    } else {
      res.status(400);
      throw new Error('Accomplishment not found');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete accomplishment
    @route: DELETE /api/resume/:resumeId/accomplishment/:accomplishmentId
    @access: private
*/
const deleteAccomplishment = asyncHandler(async (req, res) => {
  const { resumeId, accomplishmentId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const accomplishments = resume.accomplishment;
    accomplishments.pull(accomplishmentId);
    const updatedAccomplishment = await resume.save();
    if (updatedAccomplishment) {
      res
        .status(200)
        .json({ message: 'Accomplishment deleted', _id: accomplishmentId });
    } else {
      res.status(400);
      throw new Error('Could not delete accomplishment');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

export {
  getAccomplishment,
  createAccomplishment,
  updateAccomplishment,
  deleteAccomplishment,
};
