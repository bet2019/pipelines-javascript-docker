import React from "react";
import Button from "antd/lib/button";
import { Form } from 'react-final-form'
import { connect } from 'react-redux';
import NominationAbstractForm from "./NominationAbstractForm";
import { withTranslation } from "react-i18next";
import FormLevelErrorPlaceholder from "src/_components/form/FormLevelErrorPlaceholder";
import LogoLoadingSpinner from "src/_components/ui/LogoLoadingSpinner";
import globalDirectoryService from "../../../globalDirectoryService";

export const NOMINATION_EDIT_FORM_ID = 'nomination-edit-form-id'

class NominationEditForm extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      saveProcessingLoading: false,
      supportingDataLoaded: false,
      industryVertical: [],
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

  render() {
    const {i18n} = this.props
    const formId = 'external-nomination-edit-form'

    if (!this.state.supportingDataLoaded) {
      return <LogoLoadingSpinner />
    }
    
    return (
      <>
     <Form
        initialValues={this.props.initialValues || {}}
        onSubmit={this.props.onSubmit}
        // validate={values => {
        //   // do validation here, and return errors object
        // }}
      >
        {({ submitError, submitFailed, handleSubmit, invalid, pristine, form, submitting, ...rest }) => (

        <form id={formId} onSubmit={handleSubmit}>

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
            >{i18n.t('label.save')}</Button>
            <Button onClick={()=>this.props.onClose()}>{i18n.t('label.cancel')}</Button>
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
    nominationSources: state.rootApp.nominationSources
  }
}

export default connect(mapStateToProps)(withTranslation()(NominationEditForm))