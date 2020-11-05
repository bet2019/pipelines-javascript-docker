import React from 'react'
import NoMatch from 'src/_components/NoMatch';
import CompanyEdit from './Edit'
import {Switch, Route} from 'react-router-dom'
import { routes } from 'src/_helpers/routing';

class CompanyRouteContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={routes.ui.externalUser.companies.edit} component={CompanyEdit}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default CompanyRouteContainer