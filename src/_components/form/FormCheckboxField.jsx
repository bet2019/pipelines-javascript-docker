import React from 'react'
import FormCheckbox from "src/_components/form/FormCheckbox";
import config from 'src/config';

const FormCheckboxField = props => {
  const {
    label,
    className,
    meta: { touched, error },
    input,
    ...rest
  } = props;

  delete input.value

  return (
    <div
      className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
      <FormCheckbox
        size={config.form.fieldSize}
        {...input}
        {...rest}
      >
        <span className={props.required === true ? "required" : ""}></span> {label}
      </FormCheckbox>
      {touched && error ? <div className="app-error">{error}</div> : ""}
    </div>
  )
}

export default FormCheckboxField