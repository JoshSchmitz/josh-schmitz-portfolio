import { useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import Menu from '../menu/Menu';

const Header = () => {
  const navigate = useNavigate();
  const logoClick = () => {
    navigate('/');
  };

  return (
    <div className='header-wrapper'>
      <div className='header'>
        <div className='header-content'>
          <Logo onClick={logoClick} />
          <Menu type='header' />
        </div>
      </div>
    </div>
  );
};
export default Header;
