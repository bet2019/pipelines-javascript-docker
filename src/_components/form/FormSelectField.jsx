import React from 'react'
import FormSelectElement from './FormSelectElement';
import config from 'src/config';

const FormSelectField = props => {
  
  const {
    label,
    className,
    placeholder,
    meta: { touched },
    data,
    dataSource,
    input,
    defaultValue,
    helpBlock,
    ...rest
  } = props;

  const error = props.meta.error || props.meta.submitError

  if (undefined !== data){
    console.warn('FormSelectField got data prop, which is deprecated, use dataSource instead')
  }
 
  return (
    <div
      className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
      {
        label
          ? <label>{label} <span className={props.required === true ? "required" : ""}></span> </label>
          : ''
      }

      <FormSelectElement
        size={config.form.fieldSize}
        input={input}
        {...rest}
        placeholder={placeholder || label}
        data={data || dataSource}
        defaultValue={defaultValue || input.value || undefined}
      />
      {
        helpBlock
          ? <small className="form-text text-muted">{helpBlock}</small>
          : ''
      }
      {touched && error ? <div className="app-error">{error}</div> : ""}
    </div>
  )
}

export default FormSelectField