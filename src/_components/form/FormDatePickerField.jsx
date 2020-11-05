import React      from "react";
import config     from "src/config";
import FormDatePicker from "./FormDatePicker";
import moment from 'moment';

const FormDatePickerField = props => {
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
  
      <FormDatePicker
        size={config.form.fieldSize}
        input={input}
        {...rest}
        prefix={prefix}
        placeholder={placeholder || label}
        type={type}
        defaultValue={input.value ? moment(input.value, config.dateFormat) : undefined}
      />
      {touched && error ? <div className="app-error">{error}</div> : ""}
    </div>
  )
}

export default FormDatePickerField


