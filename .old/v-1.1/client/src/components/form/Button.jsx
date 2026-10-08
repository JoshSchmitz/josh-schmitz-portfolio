import PropTypes from 'prop-types';

// import components
import PulseLoader from 'react-spinners/PulseLoader';

const Button = ({ label, loading, onSubmit }) => {
  return (
    <button className='button' type='submit' onClick={onSubmit}>
      {loading ? (
        <PulseLoader
          className='loader-button'
          loading={loading}
          size={10}
          color='#f4f4f4'
        />
      ) : (
        label
      )}
    </button>
  );
};
Button.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default Button;
