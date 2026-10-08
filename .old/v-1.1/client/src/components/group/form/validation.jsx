// import icons
import { nanoid } from '@reduxjs/toolkit';
import {
  MdOutlineSportsFootball,
  MdGroups,
  MdMilitaryTech,
  MdBusinessCenter,
  MdComputer,
  MdCrop,
} from 'react-icons/md';
import { BsFillMortarboardFill, BsPencilFill } from 'react-icons/bs';

// position
const title_validation = {
  id: 'title',
  type: 'text',
  placeholder: 'Group title',
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

//enddate
const enddate_validation = {
  id: 'endDate',
  label: 'End Date',
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
      value: 'MdMilitaryTech',
      label: (
        <div className='option-content' key={nanoid()}>
          <BsFillMortarboardFill className='icon' />
        </div>
      ),
    },
    {
      value: 'MdGroups',
      label: (
        <div className='option-content' key={nanoid()}>
          <MdGroups className='icon' />
        </div>
      ),
    },
    {
      value: 'MdOutlineSportsFootball',
      label: (
        <div className='option-content' key={nanoid()}>
          <MdOutlineSportsFootball className='icon' />
        </div>
      ),
    },
    {
      value: 'BsPencilFill',
      label: (
        <div className='option-content' key={nanoid()}>
          <BsPencilFill className='icon' />
        </div>
      ),
    },
    {
      value: 'MdMilitaryTech',
      label: (
        <div className='option-content' key={nanoid()}>
          <MdMilitaryTech className='icon' />
        </div>
      ),
    },
    {
      value: 'MdBusinessCenter',
      label: (
        <div className='option-content' key={nanoid()}>
          <MdBusinessCenter className='icon' />
        </div>
      ),
    },
    {
      value: 'MdComputer',
      label: (
        <div className='option-content' key={nanoid()}>
          <MdComputer className='icon' />
        </div>
      ),
    },
    {
      value: 'MdCrop',
      label: (
        <div className='option-content' key={nanoid()}>
          <MdCrop className='icon' />
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
  startdate_validation,
  enddate_validation,
  icon_validation,
  highlighted_validation,
};
