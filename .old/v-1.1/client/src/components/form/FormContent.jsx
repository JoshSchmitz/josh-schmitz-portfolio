import PropTypes from 'prop-types';

const FormContent = ({ children }) => {
  return <div className='form-content'>{children}</div>;
};
FormContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default FormContent;
