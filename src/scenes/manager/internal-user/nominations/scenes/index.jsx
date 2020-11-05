import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routing, { routesUI } from 'src/_helpers/routing';
import NominationList from './List';
import NoMatch from 'src/_components/NoMatch';
import NominationDetails from './Details';
import NominationCreate from './Create';
import NominationEdit from './Edit';
import NominationWriteupContainer from './writeup';

class NominationContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.nominations.create')} component={NominationCreate}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.nominations.edit')} component={NominationEdit}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.nominations.view')} component={NominationDetails}/>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.nominations.list')} component={NominationList}/>
        <Route path={routesUI.internalUser.nominations.writeups._self} component={NominationWriteupContainer}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default NominationContainer