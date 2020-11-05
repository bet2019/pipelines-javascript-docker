const validationConstraints = {
  required: value => {
    if (value !== undefined
      && value !== null
      && typeof value === 'object'
      && value.constructor === Array
      ) {
      return value.length > 0 ? undefined : 'Required'
    }

    return value ? undefined : "Required"},
  email: value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined,
  number: value =>
    value && !/^[0-9]+$/i.test(value)
      ? "Should be valid number"
      : undefined,
  float: value =>
    value && !/^[0-9.]+$/i.test(value)
      ? "Should be valid number"
      : undefined,
  number0to100: value =>
    value && !(/^[0-9]+$/i.test(value) && value >= 0 && value <= 100)
      ? "Should be valid number, from 0 to 100"
      : undefined,
  tel: value =>
    value && !/^[0-9.+-]+$/i.test(value)
      ? "Invalid tel"
      : undefined
};

export const composeValidators = (validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)


export default validationConstraints;
