import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { isFormInvalid, findInputError, framer_error } from './utils/functions';

// import components
import { MdError } from 'react-icons/md';
import AsyncCreatableSelect from 'react-select/async-creatable';

const MultiValueText = ({
  id,
  label,
  placeholder,
  validation,
  initialvalue,
}) => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [fieldValue, setFieldValue] = useState([]);

  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label) => {
    return { label, value: label };
  };

  const handleKeyDown = (e) => {
    if (!inputValue) return;
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        setFieldValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
    }
  };

  useEffect(() => {
    setFirstRenderDone(true);
  }, []);

  useEffect(() => {
    initialvalue && setFieldValue(initialvalue);
    setFirstRenderDone(true);
  }, [initialvalue]);

  useEffect(() => {
    if (firstRenderDone) {
      setValue(id, fieldValue, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue]);

  return (
    <div className='selectbox'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      <Controller
        name={id}
        control={control}
        rules={validation}
        render={({ field }) => (
          <AsyncCreatableSelect
            {...field}
            id={id}
            className='select multivaluetext'
            classNamePrefix='select'
            unstyled={true}
            components={components}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={(newValue) => setFieldValue(newValue)}
            value={fieldValue}
            onKeyDown={handleKeyDown}
            onInputChange={(newValue) => setInputValue(newValue)}
            placeholder={
              placeholder ? placeholder : 'Type something and press enter...'
            }
          />
        )}
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
MultiValueText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  initialvalue: PropTypes.array,
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

export default MultiValueText;
