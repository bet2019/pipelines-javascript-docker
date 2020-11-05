import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { routes } from 'src/_helpers/routing';
import NominationContainer from './nominations/scenes';
import NoMatch from 'src/_components/NoMatch';
import CompanyRouteContainer from './company/scenes';
import ErrorBoundary from 'src/_components/ErrorBoundary';

class ExternalUserContainer extends React.Component {
  render() {
    return (
      <ErrorBoundary key={`ErrorBoundary-${JSON.stringify(this.props.location)}`}>
        <Switch>

          <Route path={routes.ui.externalUser.nominations._self} component={NominationContainer}/>
          <Route path={routes.ui.externalUser.companies._self} component={CompanyRouteContainer}/>
          <Redirect 
            from={routes.ui.manager}
            to={routes.ui.externalUser.nominations._self}
          />
          <Route component={NoMatch}/>
        </Switch>
      </ErrorBoundary>
    )
  }
}

export default ExternalUserContainer