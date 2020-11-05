import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from 'src/_helpers/routing';
import NominationList from './List';
import NoMatch from 'src/_components/NoMatch';
import NominationDetails from './Details';
import NominationCreate from './Create';
import NominationEdit from './Edit';

class NominationContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={routes.ui.externalUser.nominations.create} component={NominationCreate}/>
        <Route exact path={routes.ui.externalUser.nominations.edit} component={NominationEdit}/>
        <Route exact path={routes.ui.externalUser.nominations.view} component={NominationDetails}/>
        <Route exact path={routes.ui.externalUser.nominations.list} component={NominationList}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default NominationContainer