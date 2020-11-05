import React from 'react'
import UserRoleCreateEditForm from './components/UserRoleCreateEditForm';
import { userRolesActions } from './userRolesDucks';
import {connect} from 'react-redux'
import Routing from 'src/_helpers/routing';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class UserRolesCreate extends React.Component {

  onSubmit = (values) => {
    return this.props.dispatch(userRolesActions.create(values))
    .then(res => {
      this.props.history.push(Routing.generate('routes.ui.internalUser.settings.acl.list'))
    })
  }

  render() {
    return (
      <Can I="do" a="acl:users/manage">
        <PageTitle title="New user role">
          <UserRoleCreateEditForm 
            onSubmit={this.onSubmit}
            onClose={this.props.history.goBack}
          />
        </PageTitle>
      </Can>
    )    
  }
}

export default connect()(UserRolesCreate)