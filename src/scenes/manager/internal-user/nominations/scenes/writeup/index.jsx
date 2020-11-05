import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routing, { routes } from 'src/_helpers/routing';
import NoMatch from 'src/_components/NoMatch';
import NominationWriteupDetails from './scenes/Details';
import NominationWriteupCreate from './scenes/Create';
import NominationWriteupEdit from './scenes/Edit';
import { Can } from 'src/_helpers/permission';

class NominationWriteupContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={routes.ui.internalUser.nominations.writeups.create} component={NominationWriteupCreate}/>
        <Route exact path={routes.ui.internalUser.nominations.writeups.edit} component={NominationWriteupEdit}/>
        <Route exact path={routes.ui.internalUser.nominations.writeups.view} component={NominationWriteupDetails}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default NominationWriteupContainer