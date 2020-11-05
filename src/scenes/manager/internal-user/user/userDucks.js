import userService from "./userService";

export const userConstants = {
  USER_CREATE_NEW_REQUEST: 'APP/USER/CREATE_NEW_REQUEST',
  USER_CREATE_NEW_SUCCESS: 'APP/USER/CREATE_NEW_SUCCESS',
  USER_CREATE_NEW_FAILURE: 'APP/USER/CREATE_NEW_FAILURE',

  USER_UPDATE_REQUEST: 'APP/USER/UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'APP/USER/UPDATE_SUCCESS',
  USER_UPDATE_FAILURE: 'APP/USER/UPDATE_FAILURE'
}

export const userActions = {
  createNewUser,
  update
}

function createNewUser(values) {
  return dispatch => {
    dispatch(request(values));
    return userService.createNewUser(values)
      .then((response) => {
        dispatch(success(response.data));
        return response;
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          dispatch(failure(e.response.data));
        }
        throw e
      });
  };

  function request() {
    return { type: userConstants.USER_CREATE_NEW_REQUEST };
  }

  function success(mapping) {
    return { type: userConstants.USER_CREATE_NEW_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: userConstants.USER_CREATE_NEW_FAILURE, error };
  }
}

function update(id, values) {
  return dispatch => {
    dispatch(request(values));
    return userService.update(id, values)
      .then((response) => {
        dispatch(success(response.data));
        return response;
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          dispatch(failure(e.response.data));
        }
        throw e
      });
  };

  function request() {
    return { type: userConstants.USER_UPDATE_REQUEST };
  }

  function success(mapping) {
    return { type: userConstants.USER_UPDATE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: userConstants.USER_UPDATE_FAILURE, error };
  }
}