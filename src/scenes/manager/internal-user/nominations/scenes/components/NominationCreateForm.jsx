import React from "react";
import LogoLoadingSpinner from "src/_components/ui/LogoLoadingSpinner";
import Button from "antd/lib/button";
import {reset, reduxForm, FormSection} from 'redux-form'
import globalDirectoryService from '../../../settings/scenes/global-directory/globalDirectoryService';
import { connect } from 'react-redux';
import NominationAbstractForm from "./NominationAbstractForm";
import CompanyAbstractForm from "../../../company/components/CompanyAbstractForm";
import FormLevelErrorPlaceholder from "src/_components/form/FormLevelErrorPlaceholder";

export const NOMINATION_CREATE_FORM_ID = 'nomination-create-form-id'

class NominationCreateForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      saveProcessingLoading: false,
      supportingDataLoaded: false,
      industryVertical: [],
      customerChannel: [],
      selectExistingCompanyFlag: true,
    }
  }

  componentDidMount = () => {
    this.props.dispatch(reset(NOMINATION_CREATE_FORM_ID))
    Promise.all([
      globalDirectoryService.list('customerChannel'),
      globalDirectoryService.list('industryVertical')
    ])  
    .then( ([resCustomerChannel, resIndustryVertical]) => {
      this.setState({
        supportingDataLoaded: true,
        industryVertical: resIndustryVertical.data.rows,
        customerChannel: resCustomerChannel.data.rows
      })
    })
  }

  selectExistingCompanyToggle = (flag = true) => {
    this.setState({
      selectExistingCompanyFlag: flag
    })
  }

  render() {
    const { handleSubmit, submitting, submitFailed, invalid} = this.props

    if (!this.state.supportingDataLoaded) {
      return <LogoLoadingSpinner />
    }
    
    return (
      <>
        <form>
          <h2>Company details</h2>
{/*           {
            this.state.selectExistingCompanyFlag
            ? <>
                Select existing: 
                <Field 
                  component={FormSelectElement}                  
                />
                <a onClick={()=>this.selectExistingCompanyToggle(false)}> + Add new company</a>
              </>
            : <>
                Company create details form
                <br/>
                <a onClick={()=>this.selectExistingCompanyToggle(true)}> Select existing company</a>


              </>
          } */}

          <FormSection name="company">
            <CompanyAbstractForm
              {...this.props}
              countries={this.props.countries}
            />
          </FormSection>


          <NominationAbstractForm
            {...this.props}
            labs={this.props.labs}
            industryVertical={this.state.industryVertical}
            customerChannel={this.state.customerChannel}
            nominationSources={this.props.nominationSources}
          />

          <div className="form-default-action-btn">
            <FormLevelErrorPlaceholder show={invalid && submitFailed}/>
            <Button type="primary" 
              loading={this.state.saveProcessingLoading}
              onClick={handleSubmit(values => {
                  this.setState({
                    saveProcessingLoading: true
                  })
                  return this.props.onSubmit(values)
                  .catch( (err) => {
                    this.setState({
                      saveProcessingLoading: false
                    })
                    throw err
                  })
              })}
            >Save</Button>
            <Button onClick={()=>this.props.onClose()}>Cancel</Button>
          </div>
        </form>
      </>
    )
  }
}

NominationCreateForm = reduxForm({
  form: NOMINATION_CREATE_FORM_ID,
  enableReinitialize: true
})(NominationCreateForm);


const mapStateToProps = (state) => {
  return {
    labs: state.rootApp.labs,
    nominationSources: state.rootApp.nominationSources,
    countries: Object.values(state.rootApp.countriesDictionary)
  }
}



export default connect(mapStateToProps)(NominationCreateForm)