import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Routing, { routesUI } from 'src/_helpers/routing';
import UserContainer from './user';
import Dashboard from './dashboard/scenes';
import NoMatch from 'src/_components/NoMatch';
import NominationSourceList from './settings/scenes/global-directory/NominationSourceList';
import IndustryVerticalList from './settings/scenes/global-directory/IndustryVerticalList';
import CustomerChannelList from './settings/scenes/global-directory/CustomerChannelList';
import LabsList from './settings/scenes/labs/List';
import NominationContainer from './nominations/scenes';
import CompanyRouteContainer from './company/scenes';
import UserRolesContainer from './settings/scenes/user-roles';
import ReportsContainer from './reports';
import HelpContainer from './help';
import ErrorBoundary from 'src/_components/ErrorBoundary';
import permissionAbility from 'src/_helpers/permission';

import loadable from "@loadable/component";
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';

const NominationEventsCalendar = loadable(() => import(/* webpackChunkName: "nomination-calendar" */ "src/scenes/manager/internal-user/calendar/scenes/NominationEventsCalendar"), {
  fallback: <LogoLoadingSpinner />
})
// import NominationEventsCalendar from "src/scenes/manager/internal-user/calendar/scenes/NominationEventsCalendar"

class InternalUserContainer extends React.Component {
  render() {
    return (
      <ErrorBoundary key={`ErrorBoundary-${JSON.stringify(this.props.location)}`}>
        <div className={`${permissionAbility.can('do', 'acl:nominations/manage') ? 'highlight-customer-visible-fields' : ''}`}>
        <Switch>
          <Route exact path={routesUI.manager} component={Dashboard}/>
          <Route path={routesUI.internalUser.help} component={HelpContainer}/>
          <Route path={routesUI.internalUser.reports._self} component={ReportsContainer}/>
          <Route path={routesUI.internalUser.companies._self} component={CompanyRouteContainer}/>
          <Route path={routesUI.internalUser.nominations._self} component={NominationContainer}/>
          <Route path={routesUI.internalUser.calendar.nominationEvents} component={NominationEventsCalendar} />
          <Route path={routesUI.internalUser.users._self} component={UserContainer}/>
          <Route path={routesUI.internalUser.labs._self} component={LabsList}/>
          <Route path={routesUI.internalUser.settings.acl._self} component={UserRolesContainer}/>
          <Route path={routesUI.internalUser.settings.nominationSources.list} component={NominationSourceList}/>
          <Route path={routesUI.internalUser.settings.industryVertical.list} component={IndustryVerticalList}/>
          <Route path={routesUI.internalUser.settings.customerChannel.list} component={CustomerChannelList}/>
          <Route component={NoMatch}/>
        </Switch>
        </div>
      </ErrorBoundary>
    )
  }
}

export default InternalUserContainer