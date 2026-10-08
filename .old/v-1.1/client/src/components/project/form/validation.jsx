// position
const title_validation = {
  id: 'title',
  type: 'text',
  placeholder: 'Accomplishment title',
  validation: {
    required: { value: true, message: 'required' },
    maxLength: { value: 60, message: 'max 60 characters' },
  },
};

// description
const description_validation = {
  id: 'description',
  rows: 10,
  cols: 30,
  placeholder: 'Description',
  validation: {
    required: { value: true, message: 'required' },
  },
};

// startdate
const startdate_validation = {
  id: 'startDate',
  label: 'Start Date',
  type: 'date',
  validation: {},
};

// enddate
const enddate_validation = {
  id: 'endDate',
  label: 'End Date',
  type: 'date',
  validation: {},
};

// icon
const skills_validation = {
  id: 'skills',
  placeholder: 'Relevent Skills ...',
  isClearable: true,
  isSearchable: true,
  validation: {
    required: { value: true, message: 'required' },
  },
};

// highlighted
const highlighted_validation = {
  id: 'highlighted',
  label: 'Highlighted?',
  validation: {},
};

export {
  title_validation,
  description_validation,
  startdate_validation,
  enddate_validation,
  skills_validation,
  highlighted_validation,
};
