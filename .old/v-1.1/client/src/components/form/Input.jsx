import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { isFormInvalid, findInputError, framer_error } from './utils/functions';

const Input = ({
  id,
  type,
  placeholder,
  label,
  validation,
  min,
  max,
  step,
  defaultValue,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className='input'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        min={min && min}
        max={max && max}
        step={step && step}
        defaultValue={defaultValue}
        {...register(id, validation)}
      />
      <AnimatePresence mode='wait' initial={false}>
        {isInvalid && (
          <InputError
            type='error'
            label={label && true}
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  defaultValue: PropTypes.string,
  validation: PropTypes.object,
};

const InputError = ({ message, type, label }) => {
  return (
    <motion.p
      className={label === true ? `message label ${type}` : `message ${type}`}
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};
InputError.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  label: PropTypes.bool,
};

export default Input;
