import React from 'react'
import Input from 'antd/lib/input'
import config from 'src/config';

const FormInputField = props => {
  const {
    input,
    label,
    className,
    prefix,
    placeholder,
    type,
    helpBlock,
    meta: { touched },
    ...rest
  } = props;

  const error = props.meta.error || props.meta.submitError

  return (
    <div
      className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
      {
        label
          ? <label>{label}&nbsp;<span className={props.required === true ? "required" : ""}></span> </label>
          : ''
      }

      <div>
      <Input
        size={config.form.fieldSize}
        {...input}
        {...rest}
        prefix={prefix}
        placeholder={placeholder || label || ''}
        type={type}
      />
      {
        helpBlock
          ? <small className="form-text text-muted">{helpBlock}</small>
          : ''
      }
      </div>

      {touched && error ? <div className="app-error">{error}</div> : ""}
    </div>
  )
}

export default FormInputField