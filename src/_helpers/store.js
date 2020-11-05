import { createStore, applyMiddleware } from "redux";
import thunkMiddleware                  from "redux-thunk";
import { createLogger }                 from "redux-logger";
import rootReducer                      from "src/_helpers/reducer";
import { persistStore }                 from "redux-persist";
import { composeWithDevTools }          from 'redux-devtools-extension/developmentOnly';

const loggerMiddleware = createLogger();

let middlewares = [
  thunkMiddleware
];

if (process.env.APP_ENV !== "prod") {
  middlewares
    .push(loggerMiddleware);
}

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

export const store = createStore(
  rootReducer,
  // {permissions: appHtmlPlaceholder.permissions}, // initial store for permissions
  composeEnhancers(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);

export const persistor = persistStore(store);
