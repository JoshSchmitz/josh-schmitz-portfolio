import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get skill for resume
    @route: GET /api/resume/:resumeId/skill(/:skillId)
    @access: public
*/
const getSkill = asyncHandler(async (req, res) => {
  const { resumeId, skillId } = req.params;
  if (skillId) {
    const resume = await Resume.findById(resumeId);
    const skills = resume.skill;
    const skill = skills.filter((sk) => sk._id.valueOf() === skillId);
    if (skill) {
      res.status(200).json(skill[0]);
    } else {
      res.status(404);
      throw new Error(`Skill not found`);
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const skills = resume.skill;
      if (skills) {
        res.status(200).json(skills);
      } else {
        res.status(404);
        throw new Error('Skills not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create skill
    @route: POST /api/resume/:resumeId/skill
    @access: private
*/
const createSkill = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let skills = resume.skill;
    skills.push({
      title: req.body.title,
      startDate: req.body.startDate,
      experience: req.body.experience,
      icon: req.body.icon,
      category: req.body.category,
      highlighted: req.body.highlighted,
    });
    resume.skill = skills;
    await resume.save();
    res.status(200).json({ message: 'Skill created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update skill
    @route: PUT /api/resume/:resumeId/skill/:skillId
    @access: private
*/
const updateSkill = asyncHandler(async (req, res) => {
  const { resumeId, skillId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const skills = resume.skill;
    const [skill] = skills.filter((sk) => sk._id.valueOf() === skillId);
    if (skill) {
      skill.title = req.body.title || skill.title;
      skill.startDate = req.body.startDate ? req.body.startDate : '';
      skill.experience = req.body.experience || skill.experience;
      skill.icon = req.body.icon || skill.icon;
      skill.category = req.body.category || skill.category;
      skill.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedSkills = updatedResume.skill;
      const [updatedSkill] = updatedSkills.filter(
        (sk) => sk._id.valueOf() === skillId
      );
      res.status(200).json({
        title: updatedSkill.title,
        startDate: updatedSkill.startDate,
        experience: updatedSkill.experience,
        icon: updatedSkill.icon,
        category: updatedSkill.category,
        highlighted: updatedSkill.highlighted,
      });
    } else {
      res.status(404);
      throw new Error('Skill not found');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete skill
    @route: DELETE /api/resume/:resumeId/skill/:skillId
    @access: private
*/
const deleteSkill = asyncHandler(async (req, res) => {
  const { resumeId, skillId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const skills = resume.skill;
    skills.pull(skillId);
    const updatedSkill = await resume.save();
    if (updatedSkill) {
      res.status(200).json({ message: 'Skill deleted', _id: skillId });
    } else {
      res.status(400);
      throw new Error('Could not delete skill');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

export { getSkill, createSkill, updateSkill, deleteSkill };
