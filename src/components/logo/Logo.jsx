import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.svg';

const Logo = ({ onClick }) => {
  return (
    <div className='logo' onClick={onClick}>
      <img src={logo}></img>
    </div>
  );
};
Logo.propTypes = {
  onClick: PropTypes.func,
};
export default Logo;
