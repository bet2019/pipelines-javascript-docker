import React, { useEffect, useState } from 'react'
import { Form, Field } from 'react-final-form'
import FormDateRangePickerField from 'src/_components/form/FormDateRangePickerField';
import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import FormSelectField from 'src/_components/form/FormSelectField';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import api from 'src/_helpers/api';
import Routing, { routesAPI } from 'src/_helpers/routing';
import FormCheckboxField from '../form/FormCheckboxField';

const EngagementDetailsForm = (props) => {
  const formId = 'nomination-engagement-details-form'
  
  let [users, setUsers] = useState(false)

  useEffect(()=>{
    api.get(Routing.generate(routesAPI.internal.users.getLabMembers))
    .then(res => setUsers(res.data || []))
  }, [])

  if (!users) {
    return <LogoLoadingSpinner />
  }


  return (
    <> 
      <Form
        initialValues={props.initialValues || {}}
        onSubmit={props.onSubmit}
        // validate={values => {
        //   // do validation here, and return errors object
        // }}
      >
        {({ submitError, handleSubmit, invalid, pristine, form, submitting, ...rest }) => (
          
          <form id={formId} onSubmit={handleSubmit} className="regular-form">
            <Field
              className="form-group"
              component={FormSelectField}
              label='Sprint Number'
              name="engagementSprintN"
              dataSource={[
                {value: '0', title: 'Sprint 0'},
                {value: '0a', title: '-- Sprint 0a'},
                {value: '0b', title: '-- Sprint 0b'},
                {value: '1', title: 'Sprint 1'},
                {value: '1a', title: '-- Sprint 1a'},
                {value: '1b', title: '-- Sprint 1b'},
                {value: '2', title: 'Sprint 2'},
                {value: '2a', title: '-- Sprint 2a'},
                {value: '2b', title: '-- Sprint 2b'},
                {value: '3', title: 'Sprint 3'},
                {value: '3a', title: '-- Sprint 3a'},
                {value: '3b', title: '-- Sprint 3b'},
                {value: '4', title: 'Sprint 4'},
                {value: '4a', title: '-- Sprint 4a'},
                {value: '4b', title: '-- Sprint 4b'},
                {value: '5', title: 'Sprint 5'},
                {value: '5a', title: '-- Sprint 5a'},
                {value: '5b', title: '-- Sprint 5b'},
                {value: '6', title: 'Sprint 6'},
                {value: '6a', title: '-- Sprint 6a'},
                {value: '6b', title: '-- Sprint 6b'},
                {value: '7', title: 'Sprint 7'},
                {value: '7a', title: '-- Sprint 7a'},
                {value: '7b', title: '-- Sprint 7b'},
                {value: '8', title: 'Sprint 8'},
                {value: '8a', title: '-- Sprint 8a'},
                {value: '8b', title: '-- Sprint 8b'},
                {value: '9', title: 'Sprint 9'},
                {value: '9a', title: '-- Sprint 9a'},
                {value: '9b', title: '-- Sprint 9b'},
                {value: '10',title: 'Sprint 10'},
                {value: '10a',title: '-- Sprint 10a'},
                {value: '10b',title: '-- Sprint 10b'},
              ]}
              allowClear={true}
            />
            <Field
              className="form-group"
              component={FormDateRangePickerField}
              label="Planned dates"
              name="engagementExpectedDates"
            />
            <Field
              className="form-group"
              component={FormCheckboxField}
              label="Dates confirmed"
              type="checkbox"
              name="engagementDatesConfirmed"
            />
            <Field
              className="form-group"
              component={FormSelectField}
              label='Assigned engineers'
              name="engagementAssignedToUsers"
              valueProperty='uuid'
              titleProperty={(item)=>{
                return <span>{item.fullName} - {item.email}</span>
              }}
              filterOption={(input, option) => users.filter(i=>{
                  return i.uuid == option.props.value
                   && (
                     (i.fullName && i.fullName.toLowerCase().indexOf(input.toLowerCase()) >= 0 )
                     || 
                     i.email.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   )
                }).length > 0
              }
              dataSource={users}
              allowClear={true}
              mode="multiple"
            />
            <Field
              className="form-group"
              component={FormSelectField}
              label='Assigned PM'
              name="engagementProjectManager"
              valueProperty='uuid'
              titleProperty={(item)=>{
                return <span>{item.fullName} - {item.email}</span>
              }}
              filterOption={(input, option) => users.filter(i=>{
                  return i.uuid == option.props.value
                   && (
                     (i.fullName && i.fullName.toLowerCase().indexOf(input.toLowerCase()) >= 0 )
                     || 
                     i.email.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   )
                }).length > 0
              }
              dataSource={users}
              showSearch={true}
              allowClear={true}
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
    </>
  )
}

EngagementDetailsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EngagementDetailsForm