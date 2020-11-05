import React, { useEffect, useState } from 'react'
import { Form, Field, FormSpy } from 'react-final-form'
import FormInputField from 'src/_components/form/FormInputField';
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import FormSelectField from 'src/_components/form/FormSelectField';

const UserListFilter = props => {

  return (
    <Form
      onSubmit={ () => {} }
      initialValues={props.initialValues}
      render={() => {
        return (
        <form onSubmit={e => { e.preventDefault()}} >
          <FormSpy
            subscription={{ values: true}}
            onChange={ formState => {
              props.onChange(formState.values)
            }}
          />

          <Row>
            <Col span={6}>
              <Field 
                name="query"
                label="Search by name or email"
                component={FormInputField}
                placeholder="Search by name or email"
                size="default"
                allowClear={true}
              />
            </Col>
            <Col span={6}>
              <Field 
                name="isInternal"
                label="Backend/Frontend user"
                component={FormSelectField}
                size="default"
                dataSource={[
                  {id: "1", name: "Backend only"},
                  {id: "0", name: "Frontend only"}
                ]}
                titleProperty="name"
                valueProperty="id"
                allowClear={true}
                placeholder={'All'}
              />
            </Col>   
            <Col span={6}>
              <Field
                size="default"
                name="roleId"
                component={FormSelectField}
                label="Roles assigned to the user"
                dataSource={props.rolesDataSource}
                titleProperty="name"
                valueProperty="id"
                allowClear={true}
              />
            </Col>
          </Row>
        </form>
        )
      }}
    />
  )
}

export default React.memo(UserListFilter)