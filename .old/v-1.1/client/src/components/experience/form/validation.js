// field definitions and validations for ExperienceForm

// position
const position_validation = {
  id: 'position',
  type: 'text',
  placeholder: 'Position title',
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

// start date
const startdate_validation = {
  id: 'startDate',
  label: 'Start Date',
  type: 'date',
  validation: {
    required: { value: true, message: 'required' },
  },
};

// end date
const enddate_validation = {
  id: 'endDate',
  label: 'End Date',
  type: 'date',
  validation: {},
};

// highlighted
const highlighted_validation = {
  id: 'highlighted',
  label: 'Highlighted?',
  validation: {},
};

// skills
const skills_validation = {
  id: 'skills',
  placeholder: 'Relevent Skills ...',
  isClearable: true,
  isSearchable: true,
  noOptionsMessage: () => 'No Skills, please add one',
  validation: {
    required: { value: true, message: 'required' },
  },
};

// company name
const companyname_validation = {
  id: 'companyname',
  type: 'text',
  placeholder: 'Company name',
  validation: {
    required: { value: true, message: 'required' },
    maxLength: { value: 60, message: 'max 60 characters' },
  },
};

// company phone nunber
const companyphone_validation = {
  id: 'phone',
  type: 'tel',
  placeholder: 'Company phone',
  validation: {
    required: { value: true, message: 'required' },
    pattern: {
      value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i,
      message: '10 digit phone with separators',
    },
  },
};

// comany address
const address_validation = {
  id: 'address',
  type: 'text',
  placeholder: 'Address',
  validation: {
    required: { value: true, message: 'required' },
    maxLength: { value: 60, message: 'max 60 characters' },
  },
};

// company city
const city_validation = {
  id: 'city',
  type: 'text',
  placeholder: 'City',
  validation: {
    required: { value: true, message: 'required' },
    maxLength: { value: 60, message: 'max 30 characters' },
  },
};

//company state
const state_validation = {
  id: 'state',
  type: 'text',
  placeholder: 'State',
  validation: {
    required: { value: true, message: 'required' },
    minLength: { value: 2, message: '2 character state abreviation' },
    maxLength: { value: 2, message: '2 character state abreviation' },
  },
};

//company postcode
const postcode_validation = {
  id: 'postcode',
  type: 'text',
  placeholder: 'Postcode',
  validation: {
    required: { value: true, message: 'required' },
    pattern: { value: /^\d{5}/i, message: '5 digit number' },
  },
};

export {
  position_validation,
  description_validation,
  startdate_validation,
  enddate_validation,
  highlighted_validation,
  skills_validation,
  companyname_validation,
  companyphone_validation,
  address_validation,
  city_validation,
  state_validation,
  postcode_validation,
};
