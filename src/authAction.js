import authService from "src/authService";
import { appConstants } from "./ducksApp";
import { buildPermissionRules } from "./_helpers/permission";

export const authAction = {
  appBootstrap
}



function appBootstrap() {
  return dispatch => {
    dispatch(request());

    return authService.bootstrap().then(
      response => {
        buildPermissionRules(response.data.user.permission)
        dispatch(success(response.data))
        return response.data
      },
      error => {
        dispatch(failure(error));
        throw error;
      }
    );
  };

  function request() {
    return { type: appConstants.BOOTSTRAP_REQUEST };
  }

  function success(payload) {
    return { type: appConstants.BOOTSTRAP_SUCCESS, payload };
  }

  function failure(error) {
    return { type: appConstants.BOOTSTRAP_FAILURE, error };
  }
}

