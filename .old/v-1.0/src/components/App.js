import '../scss/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route exact path='/resume' element={<Resume></Resume>}></Route>
        <Route exact path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
