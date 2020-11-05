import React from 'react'
import CompanyAbstractForm from './CompanyAbstractForm';
import { Form } from 'react-final-form'
import {connect} from 'react-redux'
import Button from 'antd/lib/button'
import { withTranslation } from 'react-i18next';
import FormLevelErrorPlaceholder from 'src/_components/form/FormLevelErrorPlaceholder';

export const COMPANY_EDIT_FORM_ID = 'company-edit-form-id'

class CompanyEditForm extends React.Component {
  
  render() {
    const {i18n} = this.props
    const formId = 'external-company-edit-form'
    
    return (
      <Form
        initialValues={this.props.initialValues || {}}
        onSubmit={this.props.onSubmit}
        // validate={values => {
        //   // do validation here, and return errors object
        // }}
      >
        {({ submitError, submitFailed, handleSubmit, invalid, pristine, form, submitting, ...rest }) => 
      <form id={formId} onSubmit={handleSubmit}>
        <CompanyAbstractForm
          {...this.props}
          countries={this.props.countries}
        />

        <FormLevelErrorPlaceholder show={Boolean(submitError || submitFailed)}/>
            
        <div className="form-default-action-btn">
          <Button 
            type="primary" 
            loading={submitting}
            disabled={pristine || submitting}
            onClick={()=>
              document
                .getElementById(formId)
                .dispatchEvent(new Event('submit', { cancelable: true }))
            }>
            {i18n.t('label.save')}
          </Button>
          <Button onClick={()=>this.props.onClose()}>{i18n.t('label.cancel')}</Button>
        </div>
      </form>
      }
    </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    countries: Object.values(state.rootApp.countriesDictionary)
  }
}

export default connect(mapStateToProps)(withTranslation()(CompanyEditForm))