import React from 'react'
import {connect} from 'react-redux'
import permissionAbility, { Can } from 'src/_helpers/permission'
import FormMixin from 'src/_mixin/FormMixin';
import {Field, reduxForm, reset} from 'redux-form'
import HelpPixel, { helpTopics } from 'src/_components/helpPixel';

export const NOMINATION_LIST_FILTER_FORM_ID = 'nomination-list-filter-form-id'

class NominationListFilter extends FormMixin(React.Component) {

  componentDidMount() {
    return this.props.dispatch(reset(NOMINATION_LIST_FILTER_FORM_ID))
  }

  render() {
    return (
      <form onSubmit={e => { e.preventDefault()}}>
        <div className="filter-form-container">
           <div className="filter-item-container">
            <Field 
              className="form-group"
              size="default"
              name="companyName"
              label="Company"
              component={this.renderInputField}
              placeholder="Search by name"
              allowClear={true}
            />
          </div>

          <div className="filter-item-container">
            <Field 
              className="form-group"
              size="default"
              name="labId"
              label="Lab"
              component={this.renderSelectField}
              data={this.props.labsList}
              titleProperty="name"
              valueProperty="id"
              placeholder="Filter by Lab"
              allowClear={true}
            />
          </div>

          <div className="filter-item-container">
            <Field 
              className="form-group"
              size="default"
              name="industryVerticalId"
              label="Industry"
              component={this.renderSelectField}
              data={this.props.industryVerticals}
              titleProperty="name"
              valueProperty="id"
              placeholder="Filter by Industry"
              allowClear={true}
            />
          </div>

          {
            permissionAbility.can('do','acl:nominations/manage') || permissionAbility.can('do','acl:nominations/view/source_info')
            ? <div className="filter-item-container">
                <Field 
                  className="form-group"
                  size="default"
                  name="nominationSourceId"
                  label="Source"
                  component={this.renderSelectField}
                  data={this.props.nominationSourcesList}
                  titleProperty="name"
                  valueProperty="id"
                  placeholder="Filter by source"
                  allowClear={true}
                />
              </div>
            : ''
          }                      

          <div className="filter-item-container">
            <Field 
              className="form-group"
              size="default"
              name="statusId"
              label={<>Status <HelpPixel topic={helpTopics.app.nominationStatusesDescr}/></>}
              component={this.renderSelectField}
              data={Object.values(this.props.nominationStatuses)}
              titleProperty="name"
              valueProperty="id"
              placeholder="Filter by status"
              allowClear={true}
            />
          </div>

        </div>
      </form>
    )
  }
}

NominationListFilter = reduxForm({
  form: NOMINATION_LIST_FILTER_FORM_ID,
  enableReinitialize: true
})(NominationListFilter);


const mapStateToProps = state => {
  return {
    labsList: state.rootApp.labs,
    nominationSourcesList: state.rootApp.nominationSources,
    nominationStatuses: state.rootApp.nominationStatuses,
    industryVerticals: state.rootApp.industryVerticals,
  }
}

export default connect(mapStateToProps)(NominationListFilter)