import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { isFormInvalid, findInputError, framer_error } from './utils/functions';
import FormGroup from './FormGroup';

const Range = ({ id, label, validation, min, max, step, defaultValue }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className='range'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      <FormGroup>
        <input
          id={id}
          type='range'
          min={min && min}
          max={max && max}
          step={step && step}
          defaultValue={defaultValue}
          {...register(id, validation)}
        />
      </FormGroup>
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
Range.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  defaultValue: PropTypes.number,
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

export default Range;
