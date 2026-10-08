import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { newCurrentItem } from './state/nav';

const Nav = () => {
  const dispatch = useDispatch();
  const { navItems, currentItem } = useSelector((store) => store.nav);

  return (
    <nav className='nav'>
      <ul className='nav-list'>
        {navItems.map((item) => {
          const name = item.item;
          return (
            <li
              key={item.id}
              className={currentItem === name ? 'nav-item current' : 'nav-item'}
            >
              <Link
                to={name === 'Home' ? '/' : `/${name.toString().toLowerCase()}`}
                onClick={() => dispatch(newCurrentItem(name))}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
