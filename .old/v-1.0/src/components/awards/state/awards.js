import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const dateOptions = {
  timeZone: 'America/Chicago',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const initialState = {
  awards: [
    {
      id: nanoid(),
      title: 'Eagle Scout',
      date: new Date(Date.UTC(2008, 7, 20, 12, 0, 0, 0)).toLocaleDateString(
        undefined,
        dateOptions
      ),
    },
    {
      id: nanoid(),
      title: 'NSF STEM Scholarship',
      date: new Date(Date.UTC(2010, 7, 20, 12, 0, 0, 0)).toLocaleDateString(
        undefined,
        dateOptions
      ),
    },
  ],
  isLoading: true,
};

const awardsSlice = createSlice({
  name: 'awards',
  initialState,
  reducers: {
    deleteAward: (store, action) => {
      const id = action.payload;
      store.awards = store.awards.filter((item) => item.id !== id);
    },
  },
});
export const { deleteAward } = awardsSlice.actions;
export default awardsSlice.reducer;
