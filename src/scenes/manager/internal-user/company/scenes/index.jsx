import React from 'react'
import NoMatch from 'src/_components/NoMatch';
import CompanyEdit from './Edit'
import {Switch, Route} from 'react-router-dom'
import Routing from 'src/_helpers/routing';

class CompanyRouteContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={Routing.getRoute('routes.ui.internalUser.companies.edit')} component={CompanyEdit}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default CompanyRouteContainer