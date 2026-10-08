import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get leadership for resume
    @route: GET /api/resume/:resumeId/leadership(/:leadershipId)
    @access: public
*/
const getLeadership = asyncHandler(async (req, res) => {
  const { resumeId, leadershipId } = req.params;
  if (leadershipId) {
    const resume = await Resume.findById(resumeId);
    const leaderships = resume.leadership;
    const leadership = leaderships.filter(
      (sk) => sk._id.valueOf() === leadershipId
    );
    if (leadership) {
      res.status(200).json(leadership[0]);
    } else {
      res.status(404);
      throw new Error(`Leadershipt not found`);
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const leaderships = resume.leadership;
      if (leaderships) {
        res.status(200).json(leaderships);
      } else {
        res.status(404);
        throw new Error('Leaderships not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create leadership
    @route: POST /api/resume/:resumeId/leadership
    @access: private
*/
const createLeadership = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let leaderships = resume.leadership;
    leaderships.push({
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon,
      date: req.body.date,
      highlighted: req.body.highlighted,
    });
    resume.leadership = leaderships;
    await resume.save();
    res.status(200).json({ message: 'Leadership created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update leadership
    @route: PUT /api/resume/:resumeId/leadership/:leadershipId
    @access: private
*/
const updateLeadership = asyncHandler(async (req, res) => {
  const { resumeId, leadershipId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const leaderships = resume.leadership;
    const [leadership] = leaderships.filter(
      (lead) => lead._id.valueOf() === leadershipId
    );
    if (leadership) {
      leadership.title = req.body.title || leadership.title;
      leadership.description = req.body.description || leadership.description;
      leadership.icon = req.body.icon || leadership.icon;
      leadership.date = req.body.date ? req.body.date : '';
      leadership.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedLeaderships = updatedResume.leadership;
      const [updatedLeadership] = updatedLeaderships.filter(
        (lead) => lead._id.valueOf() === leadershipId
      );
      res.status(200).json({
        title: updatedLeadership.title,
        description: updatedLeadership.description,
        icon: updatedLeadership.icon,
        date: updatedLeadership.date,
        highlighted: updatedLeadership.highlighted,
      });
    } else {
      res.status(404);
      throw new Error('Leadership not found');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete leadership
    @route: DELETE /api/resume/:resumeId/leadership/:leadershipId
    @access: private
*/
const deleteLeadership = asyncHandler(async (req, res) => {
  const { resumeId, leadershipId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const leaderships = resume.leadership;
    leaderships.pull(leadershipId);
    const updatedLeadership = await resume.save();
    if (updatedLeadership) {
      res
        .status(200)
        .json({ message: 'Leadership deleted', _id: leadershipId });
    } else {
      res.status(400);
      throw new Error('Could not delete leadership');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

export { getLeadership, createLeadership, updateLeadership, deleteLeadership };
