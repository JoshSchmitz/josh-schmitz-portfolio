import PropTypes from 'prop-types';

// import components
import PulseLoader from 'react-spinners/PulseLoader';

const Confirm = ({
  confirm,
  confirmLabel,
  loading,
  close,
  closeLabel,
  message,
}) => {
  return (
    <div className='confirm'>
      <h3 className='confirm-message'>{message}</h3>
      <div className='confirm-options'>
        <button className='button' onClick={close}>
          {closeLabel}
        </button>
        <button className='button' onClick={confirm}>
          {loading ? (
            <PulseLoader
              className='loader-button'
              loading={loading}
              size={10}
              color='#f4f4f4'
            />
          ) : (
            `${confirmLabel}`
          )}
        </button>
      </div>
    </div>
  );
};
Confirm.propTypes = {
  confirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  loading: PropTypes.string,
  close: PropTypes.func.isRequired,
  closeLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default Confirm;
