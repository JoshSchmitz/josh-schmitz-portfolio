import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const dateOptions = {
  timeZone: 'America/Chicago',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const initialState = {
  educations: [
    {
      id: nanoid(),
      degree: `Bachelor's of Science`,
      majors: [{ id: nanoid(), title: 'Computer Information Systems' }],
      minors: [
        {
          id: nanoid(),
          title: 'Software Engineering',
        },
        {
          id: nanoid(),
          title: 'Web Design',
        },
      ],
      institution: {
        name: 'The College of St. Scholastica',
        location: {
          address: '1200 Kenwood Ave',
          city: 'Duluth',
          state: 'Minnesota',
          postcode: 55806,
        },
        phone: '',
      },
      startDate: new Date(
        Date.UTC(2008, 7, 20, 12, 0, 0, 0)
      ).toLocaleDateString('en-US', dateOptions),
      endDate: new Date(Date.UTC(2012, 4, 20, 12, 0, 0, 0)).toLocaleDateString(
        undefined,
        dateOptions
      ),
      gpa: 3.6,
      highlighted: true,
    },
  ],
  isloading: true,
};

const educationsSlice = createSlice({
  name: 'educations',
  initialState,
  reducers: {
    deleteEd: (store, action) => {
      const id = action.payload;
      store.educations = store.educations.filter((item) => item.id !== id);
    },
  },
});
export const { deleteEd } = educationsSlice.actions;
export default educationsSlice.reducer;
