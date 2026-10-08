import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

const Skill = ({ type, icon, text, level, separator, onClick }) => {
  return type === 'full' ? (
    <div className='skill'>
      <Icon icon={icon} />
      <div className='details'>
        <div className='text'>{text}</div>
        <div className='experience'>
          XP
          <div className='level-scale'>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                className={i < level ? 'marker-filled' : 'marker'}
                key={i}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='skill' onClick={onClick}>
      <div className='text'>{text}</div>
      {separator && <div className='separator' />}
    </div>
  );
};
Skill.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  level: PropTypes.number,
  separator: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Skill;
