import React from "react";
import LogoLoadingSpinner from "src/_components/ui/LogoLoadingSpinner";
import Button from "antd/lib/button";
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux';
import NominationAbstractForm from "./NominationAbstractForm";
import CompanyAbstractForm from "../../../company/components/CompanyAbstractForm";
import globalDirectoryService from "../../../globalDirectoryService";
import { withTranslation } from "react-i18next";
import FormLevelErrorPlaceholder from "src/_components/form/FormLevelErrorPlaceholder";

class NominationCreateForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      saveProcessingLoading: false,
      supportingDataLoaded: false,
      industryVertical: [],
      selectExistingCompanyFlag: true,
    }
  }

  componentDidMount = () => {
    Promise.all([
      globalDirectoryService.list('industryVertical')
    ])  
    .then( ([resIndustryVertical]) => {
      this.setState({
        supportingDataLoaded: true,
        industryVertical: resIndustryVertical.data.rows,
      })
    })
  }

  selectExistingCompanyToggle = (flag = true) => {
    this.setState({
      selectExistingCompanyFlag: flag
    })
  }

  render() {
    const {i18n} = this.props
    const formId = 'external-nomination-create-form'

    if (!this.state.supportingDataLoaded) {
      return <LogoLoadingSpinner />
    }
    
    return (
      <>
      <Form
        // initialValues={props.initialValues || {}}
        onSubmit={this.props.onSubmit}
        // validate={values => {
        //   // do validation here, and return errors object
        // }}
      >
        {({ submitError, submitFailed, handleSubmit, invalid, pristine, form, submitting, ...rest }) => (

        <form id={formId} onSubmit={handleSubmit}>
          <h2>{i18n.t('nominations:page.section_title.company_details')}</h2>
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

          <CompanyAbstractForm
            {...this.props}
            fieldPrefix="company"
            countries={this.props.countries}
          />

          <NominationAbstractForm
            {...this.props}
            labs={this.props.labs}
            nominationSources={this.props.nominationSources}
            industryVertical={this.state.industryVertical}
          />

          <FormLevelErrorPlaceholder show={Boolean(submitError || submitFailed)} />

          <div className="form-default-action-btn">
            <Button 
              type="primary" 
              loading={submitting}
              disabled={pristine || submitting}
              onClick={()=>
                document
                  .getElementById(formId)
                  .dispatchEvent(new Event('submit', { cancelable: true }))
              }
            >{i18n.t('translation:label.save')}</Button>
            <Button onClick={()=>this.props.onClose()}>{i18n.t('translation:label.cancel')}</Button>
          </div>
        </form>
        )}
      </Form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    labs: state.rootApp.labs,
    nominationSources: state.rootApp.nominationSources,
    countries: Object.values(state.rootApp.countriesDictionary)
  }
}

export default connect(mapStateToProps)(withTranslation('nominations')(NominationCreateForm))