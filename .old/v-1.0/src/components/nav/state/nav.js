import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  navItems: [
    { id: nanoid(), item: 'Home' },
    { id: nanoid(), item: 'Resume' },
    { id: nanoid(), item: 'Contact' },
  ],
  currentItem: 'Home',
  isLoading: true,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    newCurrentItem: (store, action) => {
      store.currentItem = action.payload;
    },
  },
});
export const { newCurrentItem } = navSlice.actions;
export default navSlice.reducer;
