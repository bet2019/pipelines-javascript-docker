import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import validationConstraints from 'src/_helpers/validationConstraints';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import {reduxForm, reset, Field, FieldArray} from 'redux-form'
import api from 'src/_helpers/api';
import Routing from 'src/_helpers/routing';
import Button from 'antd/lib/button'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import config from 'src/config';

const USER_ROLES_CREATE_EDIT_FORM_ID = 'user-roles-create-edit-form-id'

class UserRoleCreateEditForm extends FormMixin(React.Component) {

  constructor(props) {
    super(props)

    this.state = {
      permission: null,
      labs: null,
      nominationSources: null
    }
  }

  componentDidMount = () => {
    this.props.dispatch(reset(USER_ROLES_CREATE_EDIT_FORM_ID))
    Promise.all([
      api.get(Routing.generate('routes.api.internal.userRoles.cgetSupportedPermission')),
      api.get(Routing.generate('routes.api.internal.labs.cget')),
      api.get(Routing.generate('routes.api.internal.globalDirectory.cget', {gdScope: 'nominationSource'})),
    ])  
    .then( ([resRoles, resLabs, resNomSources]) => {
      this.setState({
        permission: resRoles.data,
        labs: resLabs.data.rows,
        nominationSources: resNomSources.data.rows
      })
    })
  }

  renderAclRow(permissionId) {
    let p = this.state.permission[permissionId]

    return (
      <div key={permissionId}>
        <Row>
          <Col span={1}>
            <Field
              component={this.renderCheckboxField}
              name={`permission[${permissionId}]`}
              defaultChecked={(this.props.initialValues && (this.props.initialValues.permission[permissionId])) ? true : false}
            />
          </Col>
          <Col span={23}>
            <div>{p.title}</div>
            <div>{p.descr}</div>
          </Col>
        </Row>
      </div>
    )
  }  


  render() {
    const { handleSubmit, submitting, invalid} = this.props

    if (this.state.permission === null || this.state.labs === null || this.state.nominationSources === null) {
      return <LogoLoadingSpinner />
    }
    
    return (
      <form>
        <Field
          name="name"
          component={this.renderInputField}
          label="Name"
          allowClear={false}
          validate={[validationConstraints.required]}
          required={true}
        />

        {
          !this.props.initialValues || (this.props.initialValues && this.props.initialValues.id != config.form.userPublicRoleId)
            ? Object.keys(this.state.permission).map((permissionId, idx) => {
                return this.renderAclRow(permissionId)
              })
            : ''
        }

        <Field
          name="labId"
          component={this.renderSelectField}
          label="Labs"
          mode="multiple"
          data={this.state.labs}
          titleProperty="name"
          valueProperty="id"
          helpBlock="Accessable Lab's"
        />

        {
          !this.props.initialValues || (this.props.initialValues && this.props.initialValues.id != config.form.userPublicRoleId)
          ? <Field
              name="nominationSourceId"
              component={this.renderSelectField}
              label="Nomination sources"
              mode="multiple"
              data={this.state.nominationSources}
              titleProperty="name"
              valueProperty="id"
              helpBlock="Accessable nomination sources"
            />
          : ''
        }
        

        <div className="form-default-action-btn">
          <Button type="primary" onClick={handleSubmit(values => {
            let valuesToSubmit = {...values}
            
            let newPerm = []
            if (valuesToSubmit.permission) {
              Object.keys(values.permission).map(k=> {
                if (values.permission[k]===true) {
                  newPerm.push(k)
                }
              })
            }
            valuesToSubmit.permission = newPerm
            
            return this.props.onSubmit(valuesToSubmit)
          })}>Save</Button>
          <Button onClick={()=>this.props.onClose()}>Cancel</Button>
        </div>
      </form>
    )
  }
}

UserRoleCreateEditForm = reduxForm({
  form: USER_ROLES_CREATE_EDIT_FORM_ID
})(UserRoleCreateEditForm);

export default connect()(UserRoleCreateEditForm)