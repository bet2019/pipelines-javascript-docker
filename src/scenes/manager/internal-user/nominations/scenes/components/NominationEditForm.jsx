import React from "react";
import LogoLoadingSpinner from "src/_components/ui/LogoLoadingSpinner";
import Button from "antd/lib/button";
import FormMixin from "src/_mixin/FormMixin";
import {reduxForm, reset as resetForm} from 'redux-form'
import { connect } from 'react-redux';
import NominationAbstractForm from "./NominationAbstractForm";
import globalDirectoryService from "../../../settings/scenes/global-directory/globalDirectoryService";
import FormLevelErrorPlaceholder from "src/_components/form/FormLevelErrorPlaceholder";

export const NOMINATION_EDIT_FORM_ID = 'nomination-edit-form-id'

class NominationEditForm extends FormMixin(React.Component) {

  constructor(props) {
    super(props)

    this.state = {
      saveProcessingLoading: false,
      supportingDataLoaded: false,
      industryVertical: [],
      customerChannel: [],
    }
  }

  componentDidMount = () => {
    this.props.dispatch(resetForm(NOMINATION_EDIT_FORM_ID))
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

  render() {
    const { handleSubmit, submitting, invalid, submitFailed} = this.props

   if (!this.state.supportingDataLoaded) {
      return <LogoLoadingSpinner />
    }
    
    return (
      <>
        <form>

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

NominationEditForm = reduxForm({
  form: NOMINATION_EDIT_FORM_ID,
  enableReinitialize: true
})(NominationEditForm);


const mapStateToProps = (state) => {
  return {
    labs: state.rootApp.labs,
    nominationSources: state.rootApp.nominationSources
  }
}



export default connect(mapStateToProps)(NominationEditForm)