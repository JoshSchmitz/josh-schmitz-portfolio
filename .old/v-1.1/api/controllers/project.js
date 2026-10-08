import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get project for resume
    @route: GET /api/resume/:resumeId/project(/:projectId)
    @access: public
*/
const getProject = asyncHandler(async (req, res) => {
  const { resumeId, projectId } = req.params;
  if (projectId) {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const projects = resume.project;
      const project = projects.filter(
        (proj) => proj._id.valueOf() === projectId
      );
      if (project) {
        res.status(200).json(project[0]);
      } else {
        res.status(404);
        throw new Error('Project not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const projects = resume.project;
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404);
        throw new Error('Projects not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create project
    @route: POST /api/resume/:resumeId/project
    @access: private
*/
const createProject = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let projects = resume.project;
    projects.push({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      skills: req.body.skills ? req.body.skills : [],
      highlighted: req.body.highlighted,
    });
    resume.project = projects;
    await resume.save();
    res.status(200).json({ message: 'Project created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update project
    @route: PUT /api/resume/:resumeId/project/:projectId
    @access: private
*/
const updateProject = asyncHandler(async (req, res) => {
  const { resumeId, projectId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const projects = resume.project;
    const [project] = projects.filter(
      (proj) => proj._id.valueOf() === projectId
    );
    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.startDate = req.body.startDate ? req.body.startDate : '';
      project.endDate = req.body.endDate ? req.body.endDate : '';
      project.skills = req.body.skills || project.skills;
      project.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedProjects = updatedResume.project;
      const [updatedProject] = updatedProjects.filter(
        (proj) => proj._id.valueOf() === projectId
      );
      res.status(200).json({
        title: updatedProject.title,
        description: updatedProject.description,
        startDate: updatedProject.startDate,
        endDate: updatedProject.endDate,
        skills: updatedProject.skills,
        highlighted: updatedProject.highlighted,
      });
    } else {
      res.status(400);
      throw new Error('Project not found');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete project
    @route: DELETE /api/resume/:resumeId/project/:projectId
    @access: private
*/
const deleteProject = asyncHandler(async (req, res) => {
  const { resumeId, projectId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const projects = resume.project;
    projects.pull(projectId);
    const updatedProject = await resume.save();
    if (updatedProject) {
      res.status(200).json({ message: 'Project deleted', _id: projectId });
    } else {
      res.status(400);
      throw new Error('Could not delete project');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

export { getProject, createProject, updateProject, deleteProject };
