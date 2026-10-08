import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get education for resume
    @route: GET /api/resume/:resumeId/education(/:educationId)
    @access: public
*/
const getEducation = asyncHandler(async (req, res) => {
  const { resumeId, educationId } = req.params;
  if (educationId) {
    const resume = await Resume.findById(resumeId);
    const educations = resume.education;
    const education = educations.filter(
      (edu) => edu._id.valueOf() === educationId
    );
    if (education) {
      res.status(200).json(education[0]);
    } else {
      res.status(404);
      throw new Error(`Education not found`);
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const educations = resume.education;
      if (educations) {
        res.status(200).json(educations);
      } else {
        res.status(404);
        throw new Error('Educations not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create education
    @route: POST /api/resume/:resumeId/education
    @access: private
*/
const createEducation = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let educations = resume.education;
    educations.push({
      degree: req.body.degree,
      majors: req.body.majors,
      majorCount: req.body.majorCount,
      minors: req.body.minors,
      minorCount: req.body.minorCount,
      institution: {
        name: req.body.institutionname,
        location: {
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          postcode: req.body.postcode,
        },
        phone: req.body.phone,
      },
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      gpa: req.body.gpa,
      highlighted: req.body.highlighted,
    });
    resume.education = educations;
    await resume.save();
    res.status(200).json({ message: 'Education created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update education
    @route: PUT /api/resume/:resumeId/education/:educationId
    @access: private
*/
const updateEducation = asyncHandler(async (req, res) => {
  const { resumeId, educationId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const educations = resume.education;
    const [education] = educations.filter(
      (edu) => edu._id.valueOf() === educationId
    );
    if (education) {
      education.degree = req.body.degree || education.degree;
      education.majors = req.body.majors || education.majors;
      education.majorCount = education.majors.length;
      education.minors = req.body.minors || education.minors;
      education.minorCount = education.minors.length;
      education.institution.name =
        req.body.institutionname || education.institutionname;
      education.institution.location.address =
        req.body.address || education.address;
      education.institution.location.city = req.body.city || education.city;
      education.institution.location.state = req.body.state || education.state;
      education.institution.location.postcode =
        req.body.postcode || education.postcode;
      education.institution.phone = req.body.phone || education.phone;
      education.startDate = req.body.startDate ? req.body.startDate : '';
      education.endDate = req.body.endDate ? req.body.endDate : '';
      education.gpa = req.body.gpa || education.gpa;
      education.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedEducations = updatedResume.education;
      const [updatedEducation] = updatedEducations.filter(
        (exp) => exp._id.valueOf() === educationId
      );
      res.status(200).json({
        _id: updatedEducation._id,
        degree: updatedEducation.degree,
        major: updatedEducation.major,
        majorCount: updatedEducation.majorCount,
        minor: updatedEducation.minor,
        minorCount: updatedEducation.minorCount,
        institution: {
          name: updatedEducation.institutionname,
          location: {
            address: updatedEducation.address,
            city: updatedEducation.city,
            state: updatedEducation.state,
            postcode: updatedEducation.postcode,
          },
          phone: updatedEducation.phone,
        },
        startDate: updatedEducation.startDate,
        endDate: updatedEducation.endDate,
        gpa: updatedEducation.gpa,
        highlighted: updatedEducation.highlighted,
      });
    } else {
      res.status(404);
      throw new Error('Education not found');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete education
    @route: DELETE /api/resume/:resumeId/education/:educationId
    @access: private
*/
const deleteEducation = asyncHandler(async (req, res) => {
  const { resumeId, educationId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const educations = resume.education;
    educations.pull(educationId);
    const updatedEducation = await resume.save();
    if (updatedEducation) {
      res.status(200).json({ message: 'Education deleted', _id: educationId });
    } else {
      res.status(400);
      throw new Error('Could not delete education');
    }
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

export { getEducation, createEducation, updateEducation, deleteEducation };
