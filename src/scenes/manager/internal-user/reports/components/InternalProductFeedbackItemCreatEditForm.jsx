import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import FormInputField from 'src/_components/form/FormInputField';
import validationConstraints from 'src/_helpers/validationConstraints';
import FormDatePickerField from 'src/_components/form/FormDatePickerField';
import Button from 'antd/lib/button'
import FormTextAreaField from 'src/_components/form/FormTextAreaField';

const InternalProductFeedbackItemCreatEditForm = props => {
  const formId = 'nomination-engagement-details-form'

    return(
      <Form
        initialValues={props.initialValues || {}}
        onSubmit={props.onSubmit}
      >
        {({ submitError, handleSubmit, invalid, pristine, form, submitting, ...rest }) => (
          
          <form id={formId} onSubmit={handleSubmit}>
            <Field
              className="form-group"
              component={FormDatePickerField}
              label="Date"
              name="submissionDate"
              required={true}
              validate={validationConstraints.required}
            />
            <Field
              className="form-group"
              component={FormInputField}
              label='Team'
              name="team"
              required={true}
              validate={validationConstraints.required}
            />
            <Field
              className="form-group"
              component={FormInputField}
              label='Channel'
              name="channel"
              required={true}
              validate={validationConstraints.required}
            />
            <Field
              className="form-group"
              component={FormTextAreaField}
              label='Description'
              name="description"
              rows={5}
              required={true}
              validate={validationConstraints.required}
            />
            <Field
              className="form-group"
              component={FormTextAreaField}
              label='Reporting method'
              name="reportingMethod"
              rows={5}
              helpBlock="Url to submitted issue, Support ticket number etc..."
              required={true}
              validate={validationConstraints.required}
            />
            
            {submitError && <div className="app-error">{submitError}</div>}

            <div className="form-default-action-btn mg-t-10 text-right">
              <Button
                type="primary"
                disabled={pristine || invalid || submitting}
                onClick={() =>
                  document
                    .getElementById(formId)
                    .dispatchEvent(new Event('submit', { cancelable: true }))
                }
              >Save</Button>
              <Button onClick={()=>props.onClose()}>Cancel</Button>
            </div>
          </form>
        )}
      </Form>
    )
  }

InternalProductFeedbackItemCreatEditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default InternalProductFeedbackItemCreatEditForm