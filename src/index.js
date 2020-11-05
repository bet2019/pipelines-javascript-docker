import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import history from "src/_helpers/history";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "src/_helpers/store";
import Routing from "src/_helpers/routing";
import App from "src/App";
import permission, { PermissionContext } from "./_helpers/permission";
import i18n from 'src/_helpers/i18n';
import "src/styles/ms_style.scss"
import "src/styles/index.less"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PermissionContext.Provider value={permission}>
        <Router history={history}>
          <Route title="App" path={Routing.getRoute('routes.root')} component={App} />
        </Router>
        </PermissionContext.Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
)