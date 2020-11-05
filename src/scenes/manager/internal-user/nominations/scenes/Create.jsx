import React from 'react'
import NominationCreateForm from './components/NominationCreateForm';
import { nominationActions } from '../nominationDucks';
import Routing from 'src/_helpers/routing';
import {connect} from 'react-redux'
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class NominationCreate extends React.Component {

  onSubmit = (values) => {
    return this.props.dispatch(nominationActions.create(values))
    .then( res => {
      this.props.history.replace(Routing.generate('routes.ui.internalUser.nominations.view', {nominationId: res.data.uuid}))
    })
  }

  render() {
    return (
      <PageTitle title="New Nomination">
        <Can I="do" a="acl:nominations/create">
          <div className="mg-t-20">
            <NominationCreateForm
              onSubmit={this.onSubmit}
              onClose={this.props.history.goBack}
            />
          </div>
        </Can>
      </PageTitle>
    )
  }
}


export default connect()(NominationCreate)