// field definitions and validations for ExperienceForm

// position
const title_validation = {
  id: 'title',
  type: 'text',
  placeholder: 'Resume title',
  validation: {
    required: { value: true, message: 'required' },
    maxLength: { value: 60, message: 'max 60 characters' },
  },
};

// description
const bio_validation = {
  id: 'bio',
  rows: 10,
  cols: 30,
  placeholder: 'Biography',
  validation: {
    required: { value: true, message: 'required' },
  },
};

// main
const main_validation = {
  id: 'main',
  label: 'Main Resume?',
  validation: {},
};

export { title_validation, bio_validation, main_validation };
