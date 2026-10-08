import { nanoid } from '@reduxjs/toolkit';
import Icon from '../../icon/Icon';

// field definitions and validations for SkillForm

// title
const title_validation = {
  id: 'title',
  type: 'text',
  placeholder: 'Title',
  validation: {
    required: { value: true, message: 'required' },
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

// icon
const icon_validation = {
  id: 'icon',
  placeholder: 'Select Icon ...',
  isClearable: true,
  isSearchable: true,
  listmode: 'tile',
  options: [
    {
      key: nanoid(),
      value: 'BsNodePlusFill',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='BsNodePlusFill' />
        </div>
      ),
    },
    {
      value: 'FaWrench',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='FaWrench' />
        </div>
      ),
    },
    {
      value: 'FaPencil',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='FaPencil' />
        </div>
      ),
    },
    {
      value: 'IoColorPalette',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='IoColorPalette' />
        </div>
      ),
    },
    {
      value: 'FaHandHoldingDollar',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='FaHandHoldingDollar' />
        </div>
      ),
    },
    {
      value: 'FaPeopleLine',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='FaPeopleLine' />
        </div>
      ),
    },
    {
      value: 'DiCode',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiCode' />
        </div>
      ),
    },
    {
      value: 'DiCodeBadge',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiCodeBadge' />
        </div>
      ),
    },
    {
      value: 'DiAndroid',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiAndroid' />
        </div>
      ),
    },
    {
      value: 'DiAngularSimple',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiAngularSimple' />
        </div>
      ),
    },
    {
      value: 'DiAppstore',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiAppstore' />
        </div>
      ),
    },
    {
      value: 'DiAtlassian',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiAtlassian' />
        </div>
      ),
    },
    {
      value: 'DiAws',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiAws' />
        </div>
      ),
    },
    {
      value: 'DiBootstrap',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiBootstrap' />
        </div>
      ),
    },
    {
      value: 'DiChrome',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiChrome' />
        </div>
      ),
    },
    {
      value: 'DiCodepen',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiCodepen' />
        </div>
      ),
    },
    {
      value: 'DiCreativecommons',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiCreativecommons' />
        </div>
      ),
    },
    {
      value: 'DiCss3',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiCss3' />
        </div>
      ),
    },
    {
      value: 'DiCss3Full',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiCss3Full' />
        </div>
      ),
    },
    {
      value: 'DiDatabase',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiDatabase' />
        </div>
      ),
    },
    {
      value: 'DiDotnet',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiDotnet' />
        </div>
      ),
    },
    {
      value: 'FaFigma',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='FaFigma' />
        </div>
      ),
    },
    {
      value: 'DiFirefox',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiFirefox' />
        </div>
      ),
    },
    {
      value: 'DiGit',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiGit' />
        </div>
      ),
    },
    {
      value: 'DiGithub',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiGithub' />
        </div>
      ),
    },
    {
      value: 'DiGithubBadge',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiGithubBadge' />
        </div>
      ),
    },
    {
      value: 'DiGoogleAnalytics',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiGoogleAnalytics' />
        </div>
      ),
    },
    {
      value: 'DiGoogleDrive',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiGoogleDrive' />
        </div>
      ),
    },
    {
      value: 'DiHtml5',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiHtml5' />
        </div>
      ),
    },
    {
      value: 'DiJava',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiJava' />
        </div>
      ),
    },
    {
      value: 'DiJavascript1',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiJavascript1' />
        </div>
      ),
    },
    {
      value: 'DiJsBadge',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiJsBadge' />
        </div>
      ),
    },
    {
      value: 'DiLaravel',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiLaravel' />
        </div>
      ),
    },
    {
      value: 'DiLess',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiLess' />
        </div>
      ),
    },
    {
      value: 'DiMarkdown',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiMarkdown' />
        </div>
      ),
    },
    {
      value: 'SiMicrosoft',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='SiMicrosoft' />
        </div>
      ),
    },
    {
      value: 'DiMongodb',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiMongodb' />
        </div>
      ),
    },
    {
      value: 'DiNodejs',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiNodejs' />
        </div>
      ),
    },
    {
      value: 'DiNodejsSmall',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiNodejsSmall' />
        </div>
      ),
    },
    {
      value: 'DiNpm',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiNpm' />
        </div>
      ),
    },
    {
      value: 'DiPhotoshop',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiPhotoshop' />
        </div>
      ),
    },
    {
      value: 'DiPhp',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiPhp' />
        </div>
      ),
    },
    {
      value: 'SiPowerautomate',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='SiPowerautomate' />
        </div>
      ),
    },
    {
      value: 'DiSass',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiSass' />
        </div>
      ),
    },
    {
      value: 'SiMicrosoftsharepoint',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='SiMicrosoftsharepoint' />
        </div>
      ),
    },
    {
      value: 'DiReact',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiReact' />
        </div>
      ),
    },
    {
      value: 'SiRedux',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='SiRedux' />
        </div>
      ),
    },
    {
      value: 'DiTerminal',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiTerminal' />
        </div>
      ),
    },
    {
      value: 'DiTerminalBadge',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiTerminalBadge' />
        </div>
      ),
    },
    {
      value: 'DiVisualstudio',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiVisualstudio' />
        </div>
      ),
    },
    {
      value: 'DiWordpress',
      label: (
        <div className='option-content' key={nanoid()}>
          <Icon icon='DiWordpress' />
        </div>
      ),
    },
  ],
  validation: {
    required: { value: true, message: 'required' },
  },
};

// icon
const category_validation = {
  id: 'category',
  placeholder: 'Select Category ...',
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
  startDate_validation,
  experience_validation,
  icon_validation,
  category_validation,
  highlighted_validation,
};
