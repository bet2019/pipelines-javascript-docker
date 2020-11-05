import React from 'react'
import Routing, { routesUI } from 'src/_helpers/routing';
import {connect} from 'react-redux'
import PageTitle from 'src/_components/PageTitle';
import NominationWriteupCreateEditForm from '../components/NominationWriteupCreateEditForm';
import { Can } from 'src/_helpers/permission';
import { nominationWriteupActions } from '../nominationWriteupDucks';
import { nominationActions } from '../../../nominationDucks';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';

class NominationWriteupNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nominationData: null
    }
  }

  componentDidMount() {
    return this.fetchData()
  }

  fetchData() {
    return this.props.dispatch(nominationActions.get(this.props.match.params.nominationId))
    .then( res => {
      this.setState({
        nominationData: res.data
      })
    })
  }
  
  onSubmit = (values) => {
    const {nominationId} = this.props.match.params
    return this.props.dispatch(nominationWriteupActions.create(nominationId, values))
    .then( res => {
      this.props.history.push(Routing.generate(routesUI.internalUser.nominations.writeups.view, {
        nominationId: res.data.nominationUuid,
        writeupId: res.data.uuid
      }))
    })
  }

  render() {
    return (
      <Can I="do" a="acl:nominations::writeups/manage">
        <PageTitle title="New nomination writeup">
          {
            this.state.nominationData
            ? <div className="mg-t-20">
                <NominationWriteupCreateEditForm
                  onSubmit={this.onSubmit}
                  onClose={this.props.history.goBack}
                  company={this.state.nominationData.company}
                  engagementSprintN={this.state.nominationData.engagementSprintN}
                  projectBrief={this.state.nominationData.projectBrief || ''}
                  companyBrief={this.state.nominationData.company.companyBrief || ''}
                />
              </div>
            : <LogoLoadingSpinner />
          }
        </PageTitle>
      </Can>
    )
  }
}

export default connect()(NominationWriteupNew)