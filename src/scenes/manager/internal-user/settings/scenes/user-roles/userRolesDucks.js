import userRolesService from "./userRolesService";

export const userRolesConstants = {
  USER_ROLES_CREATE_NEW_REQUEST: 'APP/USER_ROLES/CREATE_NEW_REQUEST',
  USER_ROLES_CREATE_NEW_SUCCESS: 'APP/USER_ROLES/CREATE_NEW_SUCCESS',
  USER_ROLES_CREATE_NEW_FAILURE: 'APP/USER_ROLES/CREATE_NEW_FAILURE',

  USER_ROLES_UPDATE_REQUEST: 'APP/USER_ROLES/UPDATE_REQUEST',
  USER_ROLES_UPDATE_SUCCESS: 'APP/USER_ROLES/UPDATE_SUCCESS',
  USER_ROLES_UPDATE_FAILURE: 'APP/USER_ROLES/UPDATE_FAILURE',

  USER_ROLES_GET_REQUEST: 'APP/USER_ROLES/GET_REQUEST',
  USER_ROLES_GET_SUCCESS: 'APP/USER_ROLES/GET_SUCCESS',
  USER_ROLES_GET_FAILURE: 'APP/USER_ROLES/GET_FAILURE',

  USER_ROLES_DELETE_REQUEST: 'APP/USER_ROLES/DELETE_REQUEST',
  USER_ROLES_DELETE_SUCCESS: 'APP/USER_ROLES/DELETE_SUCCESS',
  USER_ROLES_DELETE_FAILURE: 'APP/USER_ROLES/DELETE_FAILURE',
}

export const userRolesActions = {
  create,
  update,
  get,
  remove
}

function create(values) {
  return dispatch => {
    dispatch(request(values));
    return userRolesService.create(values)
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
    return { type: userRolesConstants.USER_ROLES_CREATE_NEW_REQUEST };
  }

  function success(mapping) {
    return { type: userRolesConstants.USER_ROLES_CREATE_NEW_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: userRolesConstants.USER_ROLES_CREATE_NEW_FAILURE, error };
  }
}

function update(id, values) {
  return dispatch => {
    dispatch(request(values));
    return userRolesService.update(id, values)
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
    return { type: userRolesConstants.USER_ROLES_UPDATE_REQUEST };
  }

  function success(mapping) {
    return { type: userRolesConstants.USER_ROLES_UPDATE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: userRolesConstants.USER_ROLES_UPDATE_FAILURE, error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request(id));
    return userRolesService.get(id)
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
    return { type: userRolesConstants.USER_ROLES_GET_REQUEST, payload: {id} };
  }

  function success(mapping) {
    return { type: userRolesConstants.USER_ROLES_GET_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: userRolesConstants.USER_ROLES_GET_FAILURE, error };
  }
}

function remove(id) {
  return dispatch => {
    dispatch(request(id));
    return userRolesService.remove(id)
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
    return { type: userRolesConstants.USER_ROLES_DELETE_REQUEST, payload: {id} };
  }

  function success(mapping) {
    return { type: userRolesConstants.USER_ROLES_DELETE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: userRolesConstants.USER_ROLES_DELETE_FAILURE, error };
  }
}