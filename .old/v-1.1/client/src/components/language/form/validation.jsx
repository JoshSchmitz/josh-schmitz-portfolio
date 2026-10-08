// name
const name_validation = {
  id: 'name',
  type: 'text',
  placeholder: 'Name',
  validation: {
    required: { value: true, message: 'required' },
    maxLength: { value: 60, message: 'max 60 characters' },
  },
};

// dialect
const dialect_validation = {
  id: 'dialect',
  type: 'text',
  placeholder: 'Dialect',
  validation: {
    maxLength: { value: 60, message: 'max 60 characters' },
  },
};

// years
const startDate_validation = {
  id: 'startDate',
  label: 'Start Date',
  type: 'date',
  validation: {},
};

// experience
const experience_validation = {
  id: 'experience',
  label: 'Level of Experience',
  min: 1,
  max: 6,
  step: 1,
  defaultValue: 1,
  validation: {
    required: { value: true, message: 'required' },
    min: { value: 1, message: 'minimum is 1' },
    max: { value: 6, message: 'maximum is 6' },
  },
};

// highlighted
const highlighted_validation = {
  id: 'highlighted',
  label: 'Highlighted?',
  validation: {},
};

export {
  name_validation,
  dialect_validation,
  startDate_validation,
  experience_validation,
  highlighted_validation,
};
