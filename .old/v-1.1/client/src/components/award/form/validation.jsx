// import icons
import { nanoid } from '@reduxjs/toolkit';
import Icon from '../../icon/Icon';

// position
const title_validation = {
  id: 'title',
  type: 'text',
  placeholder: 'Award title',
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

// years
const date_validation = {
  id: 'date',
  label: 'Date',
  type: 'date',
  validation: {},
};

// icon
const icon_validation = {
  id: 'icon',
  placeholder: 'Select Icon ...',
  isClearable: true,
  isSearchable: true,
  listmode: 'tile',
  options: [
    {
      value: 'BsFillMortarboardFill',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='BsFillMortarboardFill' />
        </div>
      ),
    },
    {
      value: 'MdGroups',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='MdGroups' />
        </div>
      ),
    },
    {
      value: 'MdOutlineSportsFootball',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='MdOutlineSportsFootball' />
        </div>
      ),
    },
    {
      value: 'BsPencilFill',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='BsPencilFill' />
        </div>
      ),
    },
    {
      value: 'MdMilitaryTech',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='MdMilitaryTech' />
        </div>
      ),
    },
    {
      value: 'MdBusinessCenter',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='MdBusinessCenter' />
        </div>
      ),
    },
    {
      value: 'MdComputer',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='MdComputer' />
        </div>
      ),
    },
    {
      value: 'MdCrop',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='MdCrop' />
        </div>
      ),
    },
  ],
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
  date_validation,
  icon_validation,
  highlighted_validation,
};
