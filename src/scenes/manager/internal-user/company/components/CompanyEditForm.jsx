import React from 'react'
import CompanyAbstractForm from './CompanyAbstractForm';
import {reduxForm, reset} from 'redux-form'
import {connect} from 'react-redux'
import Button from 'antd/lib/button'
import globalDirectoryService from '../../settings/scenes/global-directory/globalDirectoryService';

export const COMPANY_EDIT_FORM_ID = 'company-edit-form-id'

class CompanyEditForm extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(reset(COMPANY_EDIT_FORM_ID))
  }
  
  render() {
    const { handleSubmit, submitting, invalid} = this.props
    
    return (
      <form>
        <CompanyAbstractForm
          {...this.props}
          countries={this.props.countries}
        />

        <div className="form-default-action-btn">
          <Button type="primary" onClick={handleSubmit(values => this.props.onSubmit(values))}>Save</Button>
          <Button onClick={()=>this.props.onClose()}>Cancel</Button>
        </div>
      </form>
    )
  }
}


CompanyEditForm = reduxForm({
  form: COMPANY_EDIT_FORM_ID
})(CompanyEditForm);


const mapStateToProps = state => {
  return {
    countries: Object.values(state.rootApp.countriesDictionary)
  }
}

export default connect(mapStateToProps)(CompanyEditForm)