import React from 'react'
import UserRoleCreateEditForm from './components/UserRoleCreateEditForm';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import { userRolesActions } from './userRolesDucks';
import {connect} from 'react-redux'
import Routing from 'src/_helpers/routing';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class UserRolesEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      instanceData: null
    }
  }

  componentDidMount() {
    let roleId = this.props.match.params.roleId
    return this.props.dispatch(userRolesActions.get(roleId))
      .then(res => {
        this.setState({
          instanceData: res.data
        })
      })
  }

  onSubmit = (values) => {
    let roleId = this.props.match.params.roleId
    return this.props.dispatch(userRolesActions.update(roleId, values))
    .then(res => {
      this.props.history.push(Routing.generate('routes.ui.internalUser.settings.acl.list'))
    })
  }

  render() {

    if (this.state.instanceData === null) {
      return <LogoLoadingSpinner />
    }

    let {id, name, labId, nominationSourceId, permission} = this.state.instanceData
    return (
      <Can I="do" a="acl:users/manage">
        <PageTitle title="Edit user role">
          <UserRoleCreateEditForm
            initialValues={{
              id,
              name,
              labId,
              nominationSourceId,
              permission: permission.reduce( (acc, curValue, index) =>{ acc[curValue]=true; return acc }, {})
            }}
            onSubmit={this.onSubmit}
            onClose={this.props.history.goBack}
          />
        </PageTitle>
      </Can>
    )
  }
}

export default connect()(UserRolesEdit)