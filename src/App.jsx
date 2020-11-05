import React, { Suspense }  from "react";
import { hot }                  from "react-hot-loader/root";
import { connect } from "react-redux";
import Routing, { routes, routesUI } from "src/_helpers/routing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import IndexScene from "src/scenes/IndexScene";
import Manager from "src/scenes/manager";
import { IconContext } from "react-icons";
import TelemetryService from "./_helpers/TelemetryService";
import { withAITracking } from '@microsoft/applicationinsights-react-js';

TelemetryService.initialize()

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (process.env.APP_ENV !== "dev" && typeof window !== "undefined") {
      // FIXME: attach here whatever 3rd party services
    }
  }

  render() {
    return (
      <Suspense fallback="loading">
        <IconContext.Provider value={{ className: "app-icon", size: "1.2em", style: {verticalAlign: "-0.150em"}}}>
        <Switch>
          <Route path={routesUI.manager} component={Manager}/>
          <Redirect from={routes.root} to={routes.ui.manager} />
          <Route component={IndexScene}/>
        </Switch>
        </IconContext.Provider>
      </Suspense>
    )
  }
}
export default hot(connect()(withAITracking(TelemetryService.reactPlugin,App)));