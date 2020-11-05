import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import UserList from './scenes/List';
import UserView from './scenes/View';
import UserCreate from './scenes/Create'
import Routing from 'src/_helpers/routing';
import NoMatch from 'src/_components/NoMatch';

class UserContainer extends React.Component {
  render() {    
    return (
      <Switch>    
        <Route exact path={Routing.getRoute('routes.ui.internalUser.users.list')} component={UserList}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.users.create')} component={UserCreate}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.users.view')} component={UserView}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default UserContainer