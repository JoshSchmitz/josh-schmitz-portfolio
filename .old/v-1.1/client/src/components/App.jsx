import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

// import components
import Header from './header/Header';
import Footer from './footer/Footer';

// import css
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer transition={Slide} position='top-center' theme='dark' />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;
