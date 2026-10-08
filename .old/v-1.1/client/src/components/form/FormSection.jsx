import PropTypes from 'prop-types';

const FormSection = ({ size, children }) => {
  return (
    <div
      className={size === 'full' ? 'form-section full' : 'form-section grow-1'}
    >
      {children}
    </div>
  );
};
FormSection.propTypes = {
  size: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default FormSection;
