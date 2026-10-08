import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

const SocialButton = ({ icon, onClick }) => {
  return (
    <div className='button-social' onClick={onClick}>
      <Icon icon={icon} />
    </div>
  );
};
SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default SocialButton;
