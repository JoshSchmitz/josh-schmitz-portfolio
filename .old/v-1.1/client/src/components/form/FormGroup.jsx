import PropTypes from 'prop-types';

const FormGroup = ({ label, children }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <div className='form-group'>{children}</div>
    </>
  );
};
FormGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default FormGroup;
