import React from 'react'
import NoMatch from 'src/_components/NoMatch';
import {Switch, Route} from 'react-router-dom'
import Routing from 'src/_helpers/routing';
import UserRolesList from './List';
import UserRolesEdit from './Edit';
import UserRolesCreate from './Create';

class UserRolesContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.settings.acl.edit')} component={UserRolesEdit}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.settings.acl.create')} component={UserRolesCreate}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.settings.acl.list')} component={UserRolesList}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default UserRolesContainer