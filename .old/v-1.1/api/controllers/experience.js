import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get experience for resume
    @route: GET /api/resume/:resumeId/experience(/:experienceId)
    @access: public
*/
const getExperience = asyncHandler(async (req, res) => {
  const { resumeId, experienceId } = req.params;
  if (experienceId) {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const experiences = resume.experience;
      const experience = experiences.filter(
        (exp) => exp._id.valueOf() === experienceId
      );
      if (experience) {
        res.status(200).json(experience[0]);
      } else {
        res.status(404);
        throw new Error(`Experience not found`);
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } else {
    const resume = await Resume.findById(resumeId);
    const experiences = resume.experience;
    if (experiences) {
      res.status(200).json(experiences);
    } else {
      res.status(404);
      throw new Error('Experiences not found');
    }
  }
});

/* 
    @desc: Create experience
    @route: POST /api/resume/:resumeId/experience
    @access: private
*/
const createExperience = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let experiences = resume.experience;
    experiences.push({
      position: req.body.position,
      company: {
        name: req.body.companyname,
        location: {
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          postcode: req.body.postcode,
        },
        phone: req.body.phone,
      },
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      skills: req.body.skills ? req.body.skills : [],
      highlighted: req.body.highlighted,
    });
    resume.experience = experiences;
    await resume.save();
    res.status(200).json({ message: 'Experience created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update experience
    @route: PUT /api/resume/:resumeId/experience/:experienceId
    @access: private
*/
const updateExperience = asyncHandler(async (req, res) => {
  const { resumeId, experienceId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const experiences = resume.experience;
    const [experience] = experiences.filter(
      (exp) => exp._id.valueOf() === experienceId
    );
    if (experience) {
      experience.position = req.body.position || experience.position;
      experience.company.name = req.body.companyname || experience.company.name;
      experience.company.location.address =
        req.body.address || experience.company.location.address;
      experience.company.location.city =
        req.body.city || experience.company.location.city;
      experience.company.location.state =
        req.body.state || experience.company.location.state;
      experience.company.location.postcode =
        req.body.postcode || experience.company.location.postcode;
      experience.company.phone = req.body.phone || experience.company.phone;
      experience.description = req.body.description || experience.description;
      experience.highlighted = req.body.highlighted;
      experience.skills = req.body.skills || experience.skills;
      experience.startDate = req.body.startDate ? req.body.startDate : '';
      experience.endDate = req.body.endDate ? req.body.endDate : '';

      const updatedResume = await resume.save();
      const updatedExperiences = updatedResume.experience;
      const [updatedExperience] = updatedExperiences.filter(
        (exp) => exp._id.valueOf() === experienceId
      );
      res.status(200).json({
        _id: updatedExperience._id,
        position: updatedExperience.position,
        company: {
          name: updatedExperience.company.name,
          location: {
            address: updatedExperience.company.location.address,
            city: updatedExperience.company.location.city,
            state: updatedExperience.company.location.state,
            postcode: updatedExperience.company.location.postcode,
          },
          phone: updatedExperience.company.phone,
        },
        description: updatedExperience.description,
        startDate: updatedExperience.startDate,
        endDate: updatedExperience.endDate,
        skills: updatedExperience.skills,
        highlighted: updatedExperience.highlighted,
      });
    } else {
      res.status(404);
      throw new Error('Experience not found');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete experience
    @route: DELETE /api/resume/:resumeId/experience/:experienceId
    @access: private
*/
const deleteExperience = asyncHandler(async (req, res) => {
  const { resumeId, experienceId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const experiences = resume.experience;
    experiences.pull(experienceId);
    const updatedExperience = await resume.save();
    if (updatedExperience) {
      res
        .status(200)
        .json({ message: 'Experience deleted', _id: experienceId });
    } else {
      res.status(400);
      throw new Error('Could not delete experience');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

export { createExperience, getExperience, updateExperience, deleteExperience };
