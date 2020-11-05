import React from 'react'
import NominationEditForm from './components/NominationEditForm';
import { nominationActions } from '../nominationDucks';
import Routing from 'src/_helpers/routing';
import {connect} from 'react-redux'
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';
import _ from 'lodash'

class NominationEdit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    return this.props.dispatch(nominationActions.get(this.props.match.params.nominationId))
    .then( res => {
      this.setState({
        data: res.data
      })
    })
  }


  onSubmit = (values) => {
    let nominationId = this.props.match.params.nominationId
    // FIXME: !!! 
    return this.props.dispatch(nominationActions.update(nominationId, values))
    .then( res => {
      this.props.history.push(Routing.generate('routes.ui.internalUser.nominations.view', {nominationId}))
    })
  }

  render() {

    if (!this.state.data) {
      return <LogoLoadingSpinner/>
    }

    return (
      <PageTitle title="Edit Nomination">
        <Can I="do" a="acl:nominations/manage">
          <NominationEditForm
            onSubmit={this.onSubmit}
            onClose={this.props.history.goBack}
            initialValues={_.pick(this.state.data, [
              'projectBrief',
              'contactPersonName',
              'contactPersonRole',
              'contactPersonEmail',
              'contactPersonPhone',
              'microsoftContactName',
              'microsoftContactEmail',
              'labId',
              'sourceId',
              'customerChannelId',
              'industryVerticalId',
              'msTpId',
              'msOpportunityId',
              'numOfEngineers',
              'projectedNumDevices',
              'projectedDollarConsumptions',
              'projectPhase',
              'azureCloudConsumptionLifetime',
              'azureCloudConsumption',
              'azureSubscriptionGuid',
              'iotOpportunity',
              'projectedAnnualRevenue',
              'currentStatusDesc',
              'marketOpportunity',
              'projectedSoldAnnually',
              'productPhasesDesc',
              'totalBenefits',
              'iotDesign',
              'microsoftTechnologies',
              'prioritizedWorkStreamDesc',
              'iotCloudTechnologies',
              'iotTechnologies',
            ])}
          />
        </Can>
      </PageTitle>
    )
  }
}


export default connect()(NominationEdit)