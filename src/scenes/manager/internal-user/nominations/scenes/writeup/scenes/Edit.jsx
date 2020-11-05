import React from 'react'
import { Can } from 'src/_helpers/permission';
import PageTitle from 'src/_components/PageTitle';
import NominationWriteupCreateEditForm from '../components/NominationWriteupCreateEditForm';
import {connect} from 'react-redux'
import { nominationActions } from '../../../nominationDucks';
import { nominationWriteupActions } from '../nominationWriteupDucks';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import Routing, { routesUI } from 'src/_helpers/routing';

class NominationWriteupEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      writeupData: null
    }
  }

  componentDidMount() {
    return this.fetchData()
  }

  fetchData() {
    const {nominationId, writeupId} = this.props.match.params
    return this.props.dispatch(nominationWriteupActions.get(nominationId, writeupId))
    .then( res => {
      this.setState({
        writeupData: res.data
      })
    })
  }  

  onSubmit = (values) => {

    const {nominationId, writeupId} = this.props.match.params
    return this.props.dispatch(nominationWriteupActions.update(nominationId, writeupId, values))
    .then( res => {
      this.props.history.push(Routing.generate(routesUI.internalUser.nominations.writeups.view, {
        nominationId: res.data.nominationUuid,
        writeupId: res.data.uuid
      }))
    })
  }  

  render() {
    if (!this.state.writeupData) {
      return <LogoLoadingSpinner />
    }


    return (
      <Can I="do" a="acl:nominations::writeups/manage">
        <PageTitle title="Edit writeup">
          <div className="mg-t-20">
            <NominationWriteupCreateEditForm
              onSubmit={this.onSubmit}
              onClose={this.props.history.goBack}
              company={this.state.writeupData.nomination.company}
              engagementSprintN={this.state.writeupData.nomination.engagementSprintN}
              projectBrief={this.state.writeupData.nomination.projectBrief || ''}
              companyBrief={this.state.writeupData.nomination.company.companyBrief || ''}
              initialValues={this.state.writeupData.data}
            />
          </div>
        </PageTitle>
      </Can>
    )
  }
}

export default connect()(NominationWriteupEdit)