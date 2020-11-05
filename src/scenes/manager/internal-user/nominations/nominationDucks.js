import nominationService from "./nominationService";

export const nominationConstants = {
  NOMINATION_CREATE_NEW_REQUEST: 'APP/NOMINATION/CREATE_NEW_REQUEST',
  NOMINATION_CREATE_NEW_SUCCESS: 'APP/NOMINATION/CREATE_NEW_SUCCESS',
  NOMINATION_CREATE_NEW_FAILURE: 'APP/NOMINATION/CREATE_NEW_FAILURE',

  NOMINATION_UPDATE_REQUEST: 'APP/NOMINATION/UPDATE_REQUEST',
  NOMINATION_UPDATE_SUCCESS: 'APP/NOMINATION/UPDATE_SUCCESS',
  NOMINATION_UPDATE_FAILURE: 'APP/NOMINATION/UPDATE_FAILURE',

  NOMINATION_DUPLICATE_REQUEST: 'APP/NOMINATION/DUPLICATE_REQUEST',
  NOMINATION_DUPLICATE_SUCCESS: 'APP/NOMINATION/DUPLICATE_SUCCESS',
  NOMINATION_DUPLICATE_FAILURE: 'APP/NOMINATION/DUPLICATE_FAILURE',

  NOMINATION_REMOVE_REQUEST: 'APP/NOMINATION/REMOVE_REQUEST',
  NOMINATION_REMOVE_SUCCESS: 'APP/NOMINATION/REMOVE_SUCCESS',
  NOMINATION_REMOVE_FAILURE: 'APP/NOMINATION/REMOVE_FAILURE',

  NOMINATION_GET_REQUEST: 'APP/NOMINATION/GET_REQUEST',
  NOMINATION_GET_SUCCESS: 'APP/NOMINATION/GET_SUCCESS',
  NOMINATION_GET_FAILURE: 'APP/NOMINATION/GET_FAILURE',
}

export const nominationActions = {
  create,
  update,
  remove,
  duplicate,
  get
}

function create(values) {
  return dispatch => {
    dispatch(request(values));
    return nominationService.create(values)
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

  function request(values) {
    return { type: nominationConstants.NOMINATION_CREATE_NEW_REQUEST, payload: values };
  }

  function success(mapping) {
    return { type: nominationConstants.NOMINATION_CREATE_NEW_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: nominationConstants.NOMINATION_CREATE_NEW_FAILURE, error };
  }
}

function update(id, values) {
  return dispatch => {
    dispatch(request(id, values));
    return nominationService.update(id, values)
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

  function request(id, values) {
    return { type: nominationConstants.NOMINATION_UPDATE_REQUEST, payload: {id, values} };
  }

  function success(mapping) {
    return { type: nominationConstants.NOMINATION_UPDATE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: nominationConstants.NOMINATION_UPDATE_FAILURE, error };
  }
}

function duplicate(id) {
  return dispatch => {
    dispatch(request(id));
    return nominationService.duplicate(id)
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

  function request(id) {
    return { type: nominationConstants.NOMINATION_DUPLICATE_REQUEST, payload: {id} };
  }

  function success(mapping) {
    return { type: nominationConstants.NOMINATION_DUPLICATE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: nominationConstants.NOMINATION_DUPLICATE_FAILURE, error };
  }
}


function get(id) {
  return dispatch => {
    dispatch(request(id));
    return nominationService.get(id)
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

  function request(id) {
    return { type: nominationConstants.NOMINATION_GET_REQUEST, payload: {id} };
  }

  function success(mapping) {
    return { type: nominationConstants.NOMINATION_GET_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: nominationConstants.NOMINATION_GET_FAILURE, error };
  }
}


function remove(id) {
  return dispatch => {
    dispatch(request(id));
    return nominationService.remove(id)
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

  function request(id) {
    return { type: nominationConstants.NOMINATION_REMOVE_REQUEST, payload: {id}  };
  }

  function success(mapping) {
    return { type: nominationConstants.NOMINATION_REMOVE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: nominationConstants.NOMINATION_REMOVE_FAILURE, error };
  }
}