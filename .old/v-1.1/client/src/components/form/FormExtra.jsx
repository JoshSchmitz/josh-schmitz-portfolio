import PropTypes from 'prop-types';

const FormExtra = ({ children }) => {
  return <div className='form-extra'>{children}</div>;
};
FormExtra.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default FormExtra;
