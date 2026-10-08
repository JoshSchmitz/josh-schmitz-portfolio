import PropTypes from 'prop-types';

const Form = ({ children, name }) => {
  return (
    <form
      className='form'
      id={name}
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      {children}
    </form>
  );
};
Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  name: PropTypes.string.isRequired,
};

export default Form;
