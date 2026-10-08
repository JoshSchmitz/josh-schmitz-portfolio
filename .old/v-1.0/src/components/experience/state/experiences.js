import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const initialState = {
  experiences: [
    {
      id: nanoid(),
      position: 'Autonomous Vehicle Operator',
      company: {
        name: 'May Mobility',
        location: {
          address: '1234 Airport Rd',
          city: 'Grand Rapids',
          state: 'Minnesota',
          postcode: 55744,
        },
        phone: '',
      },
      description:
        'Operated Autonomous Vehicles (AV) prioritizing safety, rider comfort, and autonomous driving by deciding when to use autonomous mode, anticipating vehicle actions, taking control when unsafe or uncomfortable, and logging events for continuous improvement.',
      startDate: new Date(
        Date.UTC(2022, 11, 5, 12, 0, 0, 0)
      ).toLocaleDateString(undefined, dateOptions),
      endDate: new Date(Date.now()).toLocaleDateString(undefined, dateOptions),
      highlighted: false,
    },
    {
      id: nanoid(),
      position: 'IT Systems Specialist',
      company: {
        name: 'North Homes Children & Family Services',
        location: {
          address: '303 SE 1st Street',
          city: 'Grand Rapids',
          state: 'Minnesota',
          postcode: 55744,
        },
      },
      description:
        'Streamlined IT processes and managed relationships with our Managed IT partner using knowledge of combining business process improvements with technology solutions. Developed IT intranet site, documented IT processes, policies, and equipment inventory, and streamlined business processes using SharePoint and Power Automate. Managed $1,000,000+ annual IT budget.',
      startDate: new Date(
        Date.UTC(2021, 2, 22, 12, 0, 0, 0)
      ).toLocaleDateString(undefined, dateOptions),
      endDate: new Date(Date.UTC(2022, 8, 29, 12, 0, 0, 0)).toLocaleDateString(
        undefined,
        dateOptions
      ),
      highlighted: true,
    },
  ],
  isloading: true,
};

const experiencesSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    deleteExp: (store, action) => {
      const id = action.payload;
      store.experiences = store.experiences.filter((item) => item.id !== id);
    },
  },
});
export const { deleteExp } = experiencesSlice.actions;
export default experiencesSlice.reducer;
