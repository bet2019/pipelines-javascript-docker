import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import {Field, reset, submit, reduxForm} from 'redux-form'
import validationConstraints from 'src/_helpers/validationConstraints';
import Button from 'antd/lib/button'

export const GD_ITEM_CREATE_EDIT_FORM_ID = 'global-directory-item-create-edit-form-id'

class GDItemCreatEditForm extends FormMixin(React.Component) {

  render() {
    const { handleSubmit, submitting, invalid} = this.props

    return (
      <form>
        <Field
          name="name"
          component={this.renderInputField}
          label="Name"
          allowClear={false}          
          required={true}
          validate={[validationConstraints.required]}
        />
        
        <div className="form-default-action-btn">
          <Button type="primary" onClick={handleSubmit(values => this.props.onSubmit(values))}>Save</Button>
          <Button onClick={()=>this.props.onClose()}>Cancel</Button>
        </div>
      </form>
    )
  }
}

GDItemCreatEditForm = reduxForm({
  form: GD_ITEM_CREATE_EDIT_FORM_ID
})(GDItemCreatEditForm);


export default GDItemCreatEditForm