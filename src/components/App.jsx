//import { useState } from 'react';
import '../css/main.min.css';

import { Outlet } from 'react-router-dom';
import Header from './header/Header';

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
