import PropTypes from 'prop-types';
import SelectBox from 'react-select';
import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { isFormInvalid, findInputError, framer_error } from './utils/functions';

const MultiSelect = ({
  id,
  label,
  options,
  validation,
  placeholder,
  isClearable,
  isSearchable,
  noOptionsMessage,
  listmode,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className='selectbox'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}

      <Controller
        render={({ field }) => (
          <SelectBox
            {...field}
            className={listmode ? `select-${listmode}` : 'select'}
            classNamePrefix={listmode ? `select-${listmode}` : 'select'}
            unstyled={true}
            isMulti
            isClearable={isClearable}
            isSearchable={isSearchable}
            noOptionsMessage={noOptionsMessage}
            id={id}
            placeholder={placeholder ? placeholder : 'Select ...'}
            options={options}
          />
        )}
        name={id}
        control={control}
        rules={validation}
      ></Controller>
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
MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  validation: PropTypes.object,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  listmode: PropTypes.string,
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

export default MultiSelect;
