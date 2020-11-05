import { combineReducers }                from "redux";
import { createMigrate, persistReducer }  from "redux-persist";
import { reducer as formReducer }         from "redux-form";
import storage                            from "redux-persist/lib/storage";
import appReducer                         from "src/ducksApp";
import authReducer, { authConstants }     from 'src/ducksAuth';

const migrations = {
  0: (state) => {
    return {
      // ...state
    };
  }/*,
  1: (state) => {
    return {
      authentication: state.authentication
    }
  },
  2: (state) => {
    return {

    }
  }*/
};


const persistConfig = {
  key: "root",
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
  blacklist: ["rootApp"]
};

const rootAppPersistConfig = {
  key: "rootApp",
  storage,
  blacklist: ["isBootstrapped","flashBag",'currentPageTitle']
}

const appMainReducer = combineReducers({
  form: formReducer,
  rootApp: persistReducer(rootAppPersistConfig, appReducer),
  authentication: authReducer
  // add below other reducers
});

const rootReducer = (state, action) => {
  if (action.type === authConstants.LOGOUT) {
    state = undefined;
  }

  return appMainReducer(state, action);
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
