// checks to see if the react-hook-form is invalid
const isFormInvalid = (err) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};

// finds the input that has an error
const findInputError = (errors, name) => {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
  return filtered;
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { opacity: 1, y: 0 },
};

export { isFormInvalid, findInputError, framer_error };
