import PropTypes from 'prop-types';

const FormHeader = ({ title, subtitle }) => {
  return (
    <div className='form-header'>
      <div className='title-bar'>
        <h1 className='title'>{title}</h1>
      </div>
      {subtitle && <h4 className='subtitle'>{subtitle}</h4>}
    </div>
  );
};
FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
export default FormHeader;
