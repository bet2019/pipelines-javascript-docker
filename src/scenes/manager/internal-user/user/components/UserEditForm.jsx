import React, { useEffect, useState } from 'react'
import FormSelectField from 'src/_components/form/FormSelectField';
import api from 'src/_helpers/api';
import Routing, { routesAPI } from 'src/_helpers/routing';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import { Form, FormSpy, Field, useField } from 'react-final-form';
import FormInputField from 'src/_components/form/FormInputField';
import validationConstraints, { composeValidators } from 'src/_helpers/validationConstraints';
import Button from 'antd/lib/button';
import config from 'src/config';
import FormLevelErrorPlaceholder from 'src/_components/form/FormLevelErrorPlaceholder';



const UserEditForm = props => {

  const formId = 'nomination-engagement-details-form'

  let [roles, setRoles] = useState(null)

  useEffect(()=>{
    api.get(Routing.generate(routesAPI.internal.userRoles.cgetFlat))
    .then( (resRoles) => {
      setRoles(resRoles.data)
    })
  }, [])

  if (roles === null) {
    return <LogoLoadingSpinner />
  }



  let {onSubmit, initialValues, ...rest} = props


  return (
    <Form
      onSubmit={(values)=>onSubmit(values).catch(err => err.errors)}
      initialValues={initialValues}
      render={({ submitError, handleSubmit, invalid, pristine, form, submitting, ...rest }) => {

        return (
          <form id={formId} onSubmit={handleSubmit}>
      
          <Field
            name="fullName"
            component={FormInputField}
            label="Name"
            allowClear={true}          
          />
          <Field
            name="email"
            component={FormInputField}
            label="Email"
            allowClear={false}          
            required={true}
            validate={composeValidators([validationConstraints.required, validationConstraints.email])}
          />
    
          <Field 
            name="isInternal"
            label="Backend/Frontend user"
            component={FormSelectField}
            size="default"
            dataSource={[
              {id: "1", name: "Backend"},
              {id: "0", name: "Frontend"}
            ]}
            titleProperty="name"
            valueProperty="id"
            allowClear={false}
          />
      
          <FormSpy
            subscription={{ values: true}}
            render={ formState => {
              return (formState.values.isInternal != "0")
                ? <Field
                    name="roles"
                    component={FormSelectField}
                    label="Roles"
                    mode="multiple"
                    required={true}
                    validate={validationConstraints.required}
                    dataSource={roles}
                    titleProperty="name"
                    valueProperty="id"
                    helpBlock="Roles assigned to member"
                  />
                : ''
            }}
          />
          
          
          <div className="form-default-action-btn mg-t-10 text-right">
          
            <FormLevelErrorPlaceholder show={Boolean(submitError)}/>
            <Button
              type="primary"
              disabled={pristine || submitting}
              onClick={() =>
                document
                  .getElementById(formId)
                  .dispatchEvent(new Event('submit', { cancelable: true }))
              }
            >Save</Button>
            <Button onClick={()=>props.onClose()}>Cancel</Button>
          </div>
        </form>
        )
      }}
      >
    </Form>
  )
}

export default UserEditForm