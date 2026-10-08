import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../nav/state/nav';
import experiencesReducer from '../experience/state/experiences';
import educationsReducer from '../education/state/educations';
import skillsReducer from '../skill/state/skills';
import leadershipsReducer from '../leadership/state/leaderships';
import awardsSlice from '../awards/state/awards';
import groupsSlice from '../groups/state/groups';
import projectsSlice from '../projects/state/projects';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    experiences: experiencesReducer,
    educations: educationsReducer,
    skills: skillsReducer,
    leaderships: leadershipsReducer,
    awards: awardsSlice,
    groups: groupsSlice,
    projects: projectsSlice,
  },
});
