import asyncHandler from 'express-async-handler';
import Resume from '../models/resume.js';

/* 
    @desc: Get language for resume
    @route: GET /api/resume/:resumeId/language(/:languageId)
    @access: public
*/
const getLanguage = asyncHandler(async (req, res) => {
  const { resumeId, languageId } = req.params;
  if (languageId) {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const languages = resume.language;
      const language = languages.filter(
        (lang) => lang._id.valueOf() === languageId
      );
      if (language) {
        res.status(200).json(language[0]);
      } else {
        res.status(404);
        throw new Error('Language not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } else {
    const resume = await Resume.findById(resumeId);
    if (resume) {
      const languages = resume.language;
      if (languages) {
        res.status(200).json(languages);
      } else {
        res.status(404);
        throw new Error('Languages not found');
      }
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  }
});

/* 
    @desc: Create language
    @route: POST /api/resume/:resumeId/language
    @access: private
*/
const createLanguage = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    let languages = resume.language;
    languages.push({
      name: req.body.name,
      dialect: req.body.dialect,
      startDate: req.body.startDate,
      experience: req.body.experience,
      highlighted: req.body.highlighted,
    });
    resume.language = languages;
    await resume.save();
    res.status(200).json({ message: 'Language created' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Update language
    @route: PUT /api/resume/:resumeId/language/:languageId
    @access: private
*/
const updateLanguage = asyncHandler(async (req, res) => {
  const { resumeId, languageId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const languages = resume.language;
    const [language] = languages.filter(
      (lang) => lang._id.valueOf() === languageId
    );
    if (language) {
      language.name = req.body.name || language.name;
      language.dialect = req.body.dialect || language.dialect;
      language.startDate = req.body.startDate || language.startDate;
      language.experience = req.body.experience || language.experience;
      language.highlighted = req.body.highlighted;

      const updatedResume = await resume.save();
      const updatedLanguages = updatedResume.language;
      const [updatedLanguage] = updatedLanguages.filter(
        (lang) => lang._id.valueOf() === languageId
      );
      res.status(200).json({
        name: updatedLanguage.name,
        dialect: updatedLanguage.dialect,
        startDate: updatedLanguage.startDate,
        experience: updatedLanguage.experience,
        highlighted: updatedLanguage.highlighted,
      });
    } else {
      res.status(400);
      throw new Error('Language not found');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

/* 
    @desc: Delete language
    @route: DELETE /api/resume/:resumeId/language/:languageId
    @access: private
*/
const deleteLanguage = asyncHandler(async (req, res) => {
  const { resumeId, languageId } = req.params;
  const resume = await Resume.findById(resumeId);
  if (resume) {
    const languages = resume.language;
    languages.pull(languageId);
    const updatedLanguage = await resume.save();
    if (updatedLanguage) {
      res.status(200).json({ message: 'Language deleted', _id: languageId });
    } else {
      res.status(400);
      throw new Error('Could not delete language');
    }
  } else {
    res.status(400);
    throw new Error('Resume not found');
  }
});

export { getLanguage, createLanguage, updateLanguage, deleteLanguage };
