import { createElement } from 'react';
import PropTypes from 'prop-types';

// import icons
import * as IoIcons from 'react-icons/io5';
import * as PiIcons from 'react-icons/pi';
import * as MdIcons from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';

const Icon = ({ icon, className, onClick }) => {
  const DisplayIcon = (iconName) => {
    if (iconName.startsWith('Io')) {
      return IoIcons[iconName];
    }
    if (iconName.startsWith('Pi')) {
      return PiIcons[iconName];
    }
    if (iconName.startsWith('Md')) {
      return MdIcons[iconName];
    }
    if (iconName.startsWith('Bi')) {
      return BiIcons[iconName];
    }
    /* if (iconName.startsWith('Di')) {
      return DiIcons[iconName];
    }
    if (iconName.startsWith('Fa')) {
      return FaIcons[iconName];
    }
    if (iconName.startsWith('Ai')) {
      return AiIcons[iconName];
    } */
    if (iconName.startsWith('Si')) {
      return SiIcons[iconName];
    }
  };

  return (
    <div className={className ? className : 'icon'} onClick={onClick}>
      {createElement(DisplayIcon(icon))}
    </div>
  );
};
Icon.propTypes = {
  icon: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
