import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { IoPeopleCircle, IoGitMerge } from 'react-icons/io5';

const dateOptions = {
  year: 'numeric',
  month: 'long',
};

const initialState = {
  leaderships: [
    {
      id: nanoid(),
      title: 'Eagle Scout',
      description: `Acieved the rank of Eagle Scout which is the highest achievement or rank attainable in the Scouts BSA program of the Boy Scouts of America (BSA). Planned, organized, and lead a group service project for the Lakewood Township community.`,
      icon: <IoPeopleCircle className='icon' />,
      date: new Date(Date.UTC(2008, 7, 20, 12, 0, 0, 0)).toLocaleDateString(
        undefined,
        dateOptions
      ),
      highlighted: false,
    },
    {
      id: nanoid(),
      title: 'Server Upgrade',
      description: `Facilitated the upgrade of North Homes' server infrastructure with our Managed IT Provider, including regular update meetings, decision making, and internal communication on downtime and changes.`,
      icon: <IoGitMerge className='icon' />,
      date: new Date(Date.UTC(2022, 1, 30, 12, 0, 0, 0)).toLocaleDateString(
        undefined,
        dateOptions
      ),
      highlighted: true,
    },
  ],
  isLoading: true,
};

const leadershipsSlice = createSlice({
  name: 'leaderships',
  initialState,
  reducers: {
    deleteLead: (store, action) => {
      const id = action.payload;
      store.educations = store.leaderships.filter((item) => item.id !== id);
    },
  },
});
export const { deleteLead } = leadershipsSlice.actions;
export default leadershipsSlice.reducer;
