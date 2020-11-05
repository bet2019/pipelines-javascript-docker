import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routing, { routes, routesUI } from 'src/_helpers/routing';
import NoMatch from 'src/_components/NoMatch';
import { Can } from 'src/_helpers/permission';
import CustomerProductFeedback from './scenes/CustomerProductFeedback';
import PowerBiReport from './scenes/PowerBiReport';
import SubmittedCompletedNominationsStat from './scenes/SubmittedCompletedNominationsStat';
import CompletedNominationsSummary from './scenes/CompletedNominationsSummary';
import UpcomingNominations from './scenes/UpcomingNominations';
import InternalProductFeedback from './scenes/InternalProductFeedback';

class ReportsContainer extends React.Component {
  render() {
    return (
      <Can I="do" a="acl:reports/view">
        <Switch>
          <Route exact path={routesUI.internalUser.reports.internalProductFeedback} component={InternalProductFeedback}/>
          <Route exact path={routesUI.internalUser.reports.customerProductFeedback} component={CustomerProductFeedback}/>
          <Route exact path={routesUI.internalUser.reports.labSubmittedCompletedNominationsStat} component={SubmittedCompletedNominationsStat}/>
          <Route exact path={routesUI.internalUser.reports.labCompletedNominationsSummary} component={CompletedNominationsSummary}/>
          <Route exact path={routesUI.internalUser.reports.labUpcomingNominations} component={UpcomingNominations}/>
          <Route exact path={routesUI.internalUser.reports.powerBiReport} component={PowerBiReport}/>
          <Route component={NoMatch}/>
        </Switch>
      </Can>
    )
  }
}

export default ReportsContainer