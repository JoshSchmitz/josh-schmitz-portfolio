import PropTypes from 'prop-types';
import {
  IoHome,
  IoFolderOpen,
  IoDocumentText,
  IoPersonCircle,
} from 'react-icons/io5';

const MenuItem = ({ name, active, type, onClick }) => {
  return (
    <li className={active ? 'menu-item-active' : 'menu-item'} onClick={onClick}>
      {type === 'header' ? (
        active ? (
          name
        ) : name === 'Home' ? (
          <IoHome />
        ) : name === 'Portfolio' ? (
          <IoFolderOpen />
        ) : name === 'Resume' ? (
          <IoDocumentText />
        ) : (
          <IoPersonCircle />
        )
      ) : (
        name
      )}
    </li>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
