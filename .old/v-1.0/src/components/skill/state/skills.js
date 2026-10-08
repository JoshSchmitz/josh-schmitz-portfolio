import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { SiReact, SiRedux } from 'react-icons/si';
import { MdAddTask } from 'react-icons/md';
import {
  IoLogoSass,
  IoLogoHtml5,
  IoLogoCss3,
  IoLogoNodejs,
} from 'react-icons/io';
import { IoLogoJavascript } from 'react-icons/io5';

const initialState = {
  skills: [
    {
      id: nanoid(),
      title: 'Front-End Web Development',
      years: 5,
      experience: 6,
      icon: <MdAddTask className='icon' />,
      category: 'skill',
      highlighted: true,
    },
    {
      id: nanoid(),
      title: 'Responsive Design',
      years: 6,
      experience: 7,
      icon: <MdAddTask className='icon' />,
      category: 'skill',
      highlighted: false,
    },
    {
      id: nanoid(),
      title: 'React',
      years: 1,
      experience: 2,
      icon: <SiReact className='icon' />,
      category: 'framework',
      highlighted: true,
    },
    {
      id: nanoid(),
      title: 'JavaScript',
      icon: <IoLogoJavascript className='icon' />,
      years: 3,
      category: 'language',
      highlighted: true,
    },
    {
      id: nanoid(),
      title: 'HTML',
      icon: <IoLogoHtml5 className='icon' />,
      years: 6,
      category: 'language',
      highlighted: false,
    },
    {
      id: nanoid(),
      title: 'CSS',
      icon: <IoLogoCss3 className='icon' />,
      years: 6,
      category: 'language',
      highlighted: false,
    },
    {
      id: nanoid(),
      title: 'SASS',
      icon: <IoLogoSass className='icon' />,
      years: 3,
      category: 'language',
      highlighted: true,
    },
    {
      id: nanoid(),
      title: 'Node.js',
      icon: <IoLogoNodejs className='icon' />,
      years: 1,
      experience: 1,
      category: 'framework',
      highlighted: false,
    },
    {
      id: nanoid(),
      title: 'Redux',
      icon: <SiRedux className='icon' />,
      years: 1,
      experience: 2,
      category: 'framework',
      highlighted: true,
    },
  ],
  isloading: true,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    deleteSkill: (store, action) => {
      const id = action.payload;
      store.skills = store.skills.filter((item) => item.id !== id);
    },
  },
});
export const { deleteSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
