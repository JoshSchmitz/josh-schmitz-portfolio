import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { isFormInvalid, findInputError, framer_error } from './utils/functions';

const Textarea = ({ id, label, cols, rows, placeholder, validation }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className='textarea'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        {...register(id, validation)}
      />
      <AnimatePresence mode='wait' initial={false}>
        {isInvalid && (
          <InputError
            type='error'
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
};

const InputError = ({ message, type }) => {
  return (
    <motion.p className={`message ${type}`} {...framer_error}>
      <MdError />
      {message}
    </motion.p>
  );
};
InputError.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Textarea;
