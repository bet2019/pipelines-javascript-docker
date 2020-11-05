import React                  from "react";
import FormDateTimePicker     from "src/_components/form/FormDateTimePicker";
import FormTimePicker         from "src/_components/form/FormTimePicker";
import FormRate               from "src/_components/form/FormRate"
import moment                 from "moment";
import config                 from "src/config";
import FormMonthRangePicker   from "src/_components/form/FormMonthRangePicker";
import FormDateRangePickerField from "src/_components/form/FormDateRangePickerField";
import FormInputField from "src/_components/form/FormInputField";
import FormSelectField from "src/_components/form/FormSelectField";
import FormDatePickerField from "src/_components/form/FormDatePickerField";
import FormTextAreaField from "src/_components/form/FormTextAreaField";
import FormCheckboxField from "src/_components/form/FormCheckboxField";

const FormMixin = base => class extends base {
  constructor(arg, ...superArgs) {
    super(arg, ...superArgs);
  }

  renderTimeField = props => {
    const {
      input,
      label,
      className,
      prefix,
      placeholder,
      type,
      meta: { touched, error },
      ...rest
    } = props;

    return (
      <div
        className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
        {
          label
          ? <label>{label} <span className={props.required === true ? "required" : ""}></span> </label>
          : ''
        }

        <FormTimePicker
          size={config.form.fieldSize}
          input={input}
          {...rest}
          prefix={prefix}
          placeholder={placeholder || label || config.timeFormat}
          type={type}
          defaultValue={input.value ? moment(input.value, config.timeFormat) : undefined}
          defaultOpenValue={moment('00:00', config.timeFormat)}
        />
        {touched && error ? <div className="app-error">{error}</div> : ""}
      </div>
    );
  };

  /**
   * @deprecated use final-react-form and separated component FormDatePickerField
   */
  renderDateField = props => {
    return FormDatePickerField(props)
  }

  renderDateTimeField = props => {
    const {
      input,
      label,
      className,
      prefix,
      placeholder,
      type,
      meta: { touched, error },
      ...rest
    } = props;

    return (
      <div
        className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
        {
          label
            ? <label>{label} <span className={props.required === true ? "required" : ""}></span> </label>
            : ''
        }

        <FormDateTimePicker
          size={config.form.fieldSize}
          input={input}
          {...rest}
          prefix={prefix}
          placeholder={placeholder || label}
          type={type}
          defaultValue={input.value ? moment(input.value, config.dateTimeFormat) : undefined}
        />
        {touched && error ? <div className="app-error">{error}</div> : ""}
      </div>
    );
  };

  /**
   * @deprecated use final-react-form and separated component FormDateRangePickerField
   */
  renderDateRangeField = props => {
    return FormDateRangePickerField(props)
  };

  renderMonthRangeField = props => {
    const {
      input,
      label,
      className,
      prefix,
      placeholder,
      dateFormat,
      type,
      meta: { touched, error },
      ...rest
    } = props;
  

    return (
      <div
        className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
        {
          label
            ? <label>{label} <span className={props.required === true ? "required" : ""}></span> </label>
            : ''
        }

        <FormMonthRangePicker
          size={config.form.fieldSize}
          input={input}
          format={dateFormat||undefined}
          {...rest}
          prefix={prefix}
          placeholder={placeholder || label || ''}
          type={type}
          defaultValue={input.value ? [moment(input.value[0]), moment(input.value[1])] : undefined}
        />
        {touched && error ? <div className="app-error">{error}</div> : ""}
      </div>
    );
  };

  renderRateField = props => {
    const {
      input,
      label,
      className,
      helpBlock,
      inline,
      meta: { touched, error },
      ...rest
    } = props;

    return (
      <div
        className={(className || "") + " " + (touched && error ? " has-error" : "")}> {/*form-group*/}
        {
          label
            ? <label>{label}&nbsp;<span className={props.required === true ? "required" : ""}></span> </label>
            : ''
        }

        {
          !inline
          ? <div>
              <FormRate
                {...input}
                {...rest}
              />
            </div>
          : ''
        }
        
        {
          helpBlock
            ? <small className="form-text text-muted">{helpBlock}</small>
            : ''
        }

        {touched && error ? <div className="app-error">{error}</div> : ""}
      </div>
    );
  };  

  /**
   * @deprecated use final-react-form and component FormInputField
   */
  renderInputField = props => {
    return FormInputField(props)
  };

  /**
   * @deprecated use final-react-form and component FormTextAreaField
   */
  renderTextAreaField = props => {
    return FormTextAreaField(props)
  };

  /**
   * @deprecated use final-react-form and component FormSelectField
   */
  renderSelectField = props => {
    return FormSelectField(props)
  };

    /**
   * @deprecated use final-react-form and component FormCheckboxField
   */
  renderCheckboxField = props => {
    return FormCheckboxField(props)
  }


};
export default FormMixin;
