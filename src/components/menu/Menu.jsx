import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MenuItem from './MenuItem';

/* Menu Items JSON variable - future use
const menu = {
  menu: {
    items: [
      { name: 'Home' },
      { name: 'Portfolio' },
      { name: 'Resume' },
      { name: 'Contact' },
    ],
  },
};
 */

const Menu = ({ type }) => {
  const [selectedItem, setSelectedItem] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Sync state with URL on mount and when location changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setSelectedItem('home');
    else if (path === '/portfolio') setSelectedItem('portfolio');
    else if (path === '/portfolio-joshschmitz') setSelectedItem('portfolio');
    else if (path === '/portfolio-vpwildrice') setSelectedItem('portfolio');
    else if (path === '/resume') setSelectedItem('resume');
    else if (path === '/skills') setSelectedItem('resume');
    else if (path === '/contact') setSelectedItem('contact');
  }, [location]);

  const classname = `menu-bar-${type || 'default'}`;

  const menuClick = (location) => {
    if (location === 'home') {
      navigate('/');
      setSelectedItem(location);
    } else if (location === 'portfolio') {
      navigate(`/${location}`);
      setSelectedItem(location);
    } else if (location === 'resume') {
      navigate(`/${location}`);
      setSelectedItem(location);
    } else if (location === 'contact') {
      navigate(`/${location}`);
      setSelectedItem(location);
    }
  };

  return (
    <ul className={classname}>
      <MenuItem
        name='Home'
        active={selectedItem === 'home'}
        onClick={() => menuClick('home')}
        type={type}
      />
      <MenuItem
        name='Portfolio'
        active={selectedItem === 'portfolio'}
        onClick={() => menuClick('portfolio')}
        type={type}
      />
      <MenuItem
        name='Resume'
        active={selectedItem === 'resume'}
        onClick={() => menuClick('resume')}
        type={type}
      />
      <MenuItem
        name='Contact'
        active={selectedItem === 'contact'}
        onClick={() => menuClick('contact')}
        type={type}
      />
    </ul>
  );
};
Menu.propTypes = {
  type: PropTypes.string.isRequired,
};
export default Menu;
