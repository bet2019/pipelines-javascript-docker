import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import {Field, reset, submit,reduxForm} from 'redux-form'
import validationConstraints from 'src/_helpers/validationConstraints';
import Button from 'antd/lib/button'
import api from 'src/_helpers/api';
import Routing, { routesAPI } from 'src/_helpers/routing';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import config from 'src/config';

export const USER_CREATE_FORM_ID = 'user-create-edit-form-id'

class UserCreateForm extends FormMixin(React.Component) {

  constructor(props) {
    super(props)

    this.state = {
      roles: null,
    }
  }

  componentDidMount = () => {
    this.props.dispatch(reset(USER_CREATE_FORM_ID))
    Promise.all([
      api.get(Routing.generate(routesAPI.internal.userRoles.cgetFlat)),
    ])  
    .then( ([resRoles]) => {
      this.setState({
        roles: resRoles.data.filter(i=> i.id!= config.form.userPublicRoleId),
      })
    })
  }

  render() {
    const { handleSubmit, submitting, invalid} = this.props

    if (this.state.roles === null) {
      return <LogoLoadingSpinner />
    }

    return (
      <form>
        <Field
          name="fullName"
          component={this.renderInputField}
          label="Name"
          allowClear={true}          
        />
        <Field
          name="email"
          component={this.renderInputField}
          label="Email"
          allowClear={false}          
          required={true}
          validate={[validationConstraints.required, validationConstraints.email]}
        />
        <Field
          name="roles"
          component={this.renderSelectField}
          label="Roles"
          mode="multiple"
          required={true}
          validate={[validationConstraints.required]}
          dataSource={this.state.roles}
          titleProperty="name"
          valueProperty="id"
          helpBlock="Roles assigned to member"
        />
        
        <div className="form-default-action-btn">
          <Button type="primary" onClick={handleSubmit(values => this.props.onSubmit(values))}>Save</Button>
          <Button onClick={()=>this.props.onClose()}>Cancel</Button>
        </div>
      </form>
    )
  }
}

UserCreateForm = reduxForm({
  form: USER_CREATE_FORM_ID,
  enableReinitialize: true
})(UserCreateForm);


export default UserCreateForm