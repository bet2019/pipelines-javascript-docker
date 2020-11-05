import React from 'react'
import FormDateRangePicker from './FormDateRangePicker';
import config from 'src/config';
import moment from 'moment';

const FormDateRangePickerField = (props) => {
  const {
    input,
    label,
    className,
    prefix,
    placeholder,
    type,
    meta: { touched },
    ...rest
  } = props;

  const error = props.meta.error || props.meta.submitError  

  return (
    <div
      className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
      {
        label
          ? <label>{label} <span className={props.required === true ? "required" : ""}></span> </label>
          : ''
      }

      <FormDateRangePicker
        size={config.form.fieldSize}
        input={input}
        {...rest}
        prefix={prefix}
        placeholder={placeholder || label || ''}
        type={type}
        defaultValue={input.value && input.value.length ===2 && input.value[0].length > 0  && input.value[1].length > 0 ? [moment(input.value[0], config.dateFormat), moment(input.value[1], config.dateFormat)] : undefined}
      />
      {touched && error ? <div className="app-error">{error}</div> : ""}
    </div>
  );
}

export default FormDateRangePickerField