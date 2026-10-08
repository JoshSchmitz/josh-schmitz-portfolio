import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// import components
import App from './components/App.jsx';
import HomePage from './components/pages/HomePage.jsx';
import PortfolioPage from './components/pages/PortfolioPage.jsx';
import ResumePage from './components/pages/ResumePage.jsx';
import ContactPage from './components/pages/ContactPage.jsx';
import PortfolioItemJoshSchmitz from './components/pages/PortfolioItemJoshSchmitz.jsx';
import PortfolioItemVPWildRice from './components/pages/PortfolioItemVPWildRice.jsx';
import SkillsPage from './components/pages/SkillsPage.jsx';

// react router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route route='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/portfolio' element={<PortfolioPage />} />
      <Route path='/resume' element={<ResumePage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route
        path='/portfolio-joshschmitz'
        element={<PortfolioItemJoshSchmitz />}
      />
      <Route
        path='/portfolio-vpwildrice'
        element={<PortfolioItemVPWildRice />}
      />
      <Route path='/skills' element={<SkillsPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
