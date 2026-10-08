import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

const Button = ({
  type,
  text,
  isLeftIcon,
  leftIcon,
  isRightIcon,
  rightIcon,
  onClick,
}) => {
  const classname = `button-${type || 'default'}`;

  return (
    <div className={classname} onClick={onClick}>
      {isLeftIcon && (
        <div className='left-icon'>
          <Icon icon={leftIcon || ''} />
        </div>
      )}
      <div className='text'>{text}</div>
      {isRightIcon && (
        <div className='right-icon'>
          <Icon icon={rightIcon} />
        </div>
      )}
    </div>
  );
};
Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  isLeftIcon: PropTypes.bool,
  leftIcon: PropTypes.string,
  isRightIcon: PropTypes.bool,
  rightIcon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default Button;
