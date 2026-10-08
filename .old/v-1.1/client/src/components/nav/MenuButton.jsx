import PropTypes from 'prop-types';

//import components
import Icon from '../icon/Icon';

const MenuButton = ({ type }) => {
  return (
    <>
      <div className='menu-btn'>
        <div className='menu-btn-badge'>
          <div className='menu-btn-badge-text'>
            {type === 'menu' ? (
              <Icon icon='MdMenu' />
            ) : (
              <Icon icon='MdOutlineLink' />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
MenuButton.propTypes = {
  type: PropTypes.string.isRequired,
};
export default MenuButton;
