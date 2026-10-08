import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Authenticate from '../authenticate/Authenticate';
import MenuButton from './MenuButton';

// import redux state
import { newCurrentItem } from '../../store/slices/nav';
import { handleOpen } from '../../store/slices/auth/auth';
import { useGetResumeQuery } from '../../store/slices/resume/api-resume';

const Nav = ({ location }) => {
  const dispatch = useDispatch();
  const { userInfo, isOpen } = useSelector((state) => state.auth);

  // get main resume id
  let userId = '';
  if (userInfo) {
    userId = userInfo._id;
  } else {
    userId = '656776679c8a5750bef8d7fc';
  }

  // state
  const { data: resumes } = useGetResumeQuery({ userId });
  const { navItems, currentItem } = useSelector((state) => state.nav);
  const [mainResumeId, setMainResumeId] = useState('');
  const [open, setOpen] = useState(false);

  const handleNavOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function getMainResume() {
      const res = await resumes;
      if (res) {
        res.forEach((r) => {
          if (r.main === true) {
            setMainResumeId(r._id);
          }
        });
      }
    }
    getMainResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <nav className='nav'>
      {location === 'header' && (
        <div className='nav-list-item-noeffect menu'>
          <Link
            to={
              currentItem === 'Home'
                ? '/'
                : currentItem === 'Resume'
                ? `/${currentItem.toString().toLowerCase()}/${mainResumeId}`
                : `/${currentItem.toString().toLowerCase()}`
            }
            onClick={handleNavOpen}
          >
            <MenuButton type='menu' />
          </Link>
        </div>
      )}
      <ul className={open ? 'nav-list' : 'nav-list closed'}>
        {navItems.map((item) => {
          const name = item.name;
          return (
            <li
              key={item._id}
              className={
                currentItem === name ? 'nav-list-item current' : 'nav-list-item'
              }
            >
              <Link
                to={
                  name === 'Home'
                    ? '/'
                    : name === 'Resume'
                    ? `/${name.toString().toLowerCase()}/${mainResumeId}`
                    : `/${name.toString().toLowerCase()}`
                }
                onClick={() => {
                  dispatch(newCurrentItem(name));
                  open && handleNavOpen();
                }}
              >
                {name}
              </Link>
            </li>
          );
        })}
        {location === 'footer' && (
          <li className='nav-list-item'>
            {userInfo ? (
              <Link
                to='/profile'
                onClick={() => dispatch(newCurrentItem('profile'))}
              >
                Profile
              </Link>
            ) : (
              <Link to='/' onClick={() => dispatch(handleOpen(!isOpen))}>
                Sign In
              </Link>
            )}
          </li>
        )}
      </ul>
      {location === 'header' && (
        <div className='nav-list-item-noeffect'>
          <Authenticate />
        </div>
      )}
    </nav>
  );
};
Nav.propTypes = {
  location: PropTypes.string,
};
export default Nav;
