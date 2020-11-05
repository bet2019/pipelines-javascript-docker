import Routing from "src/_helpers/routing";
import api from "src/_helpers/api";

export const nominationConstants = {
  EXT_USER_NOMINATION_CREATE_NEW_REQUEST: 'EXT_USER_APP/NOMINATION/CREATE_NEW_REQUEST',
  EXT_USER_NOMINATION_CREATE_NEW_SUCCESS: 'EXT_USER_APP/NOMINATION/CREATE_NEW_SUCCESS',
  EXT_USER_NOMINATION_CREATE_NEW_FAILURE: 'EXT_USER_APP/NOMINATION/CREATE_NEW_FAILURE',

  EXT_USER_NOMINATION_UPDATE_REQUEST: 'EXT_USER_APP/NOMINATION/UPDATE_REQUEST',
  EXT_USER_NOMINATION_UPDATE_SUCCESS: 'EXT_USER_APP/NOMINATION/UPDATE_SUCCESS',
  EXT_USER_NOMINATION_UPDATE_FAILURE: 'EXT_USER_APP/NOMINATION/UPDATE_FAILURE',

  EXT_USER_NOMINATION_REMOVE_REQUEST: 'EXT_USER_APP/NOMINATION/REMOVE_REQUEST',
  EXT_USER_NOMINATION_REMOVE_SUCCESS: 'EXT_USER_APP/NOMINATION/REMOVE_SUCCESS',
  EXT_USER_NOMINATION_REMOVE_FAILURE: 'EXT_USER_APP/NOMINATION/REMOVE_FAILURE',

  EXT_USER_NOMINATION_GET_REQUEST: 'EXT_USER_APP/NOMINATION/GET_REQUEST',
  EXT_USER_NOMINATION_GET_SUCCESS: 'EXT_USER_APP/NOMINATION/GET_SUCCESS',
  EXT_USER_NOMINATION_GET_FAILURE: 'EXT_USER_APP/NOMINATION/GET_FAILURE',

  EXT_USER_NOMINATION_SUBMIT_REQUEST: 'EXT_USER_APP/NOMINATION/SUBMIT_REQUEST',
  EXT_USER_NOMINATION_SUBMIT_SUCCESS: 'EXT_USER_APP/NOMINATION/SUBMIT_SUCCESS',
  EXT_USER_NOMINATION_SUBMIT_FAILURE: 'EXT_USER_APP/NOMINATION/SUBMIT_FAILURE',
}

export const nominationActions = {
  create(values) {
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
      return { type: nominationConstants.EXT_USER_NOMINATION_CREATE_NEW_REQUEST, payload: values };
    }

    function success(mapping) {
      return { type: nominationConstants.EXT_USER_NOMINATION_CREATE_NEW_SUCCESS, payload: mapping };
    }

    function failure(error) {
      return { type: nominationConstants.EXT_USER_NOMINATION_CREATE_NEW_FAILURE, error };
    }
  },

  update(id, values) {
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
      return { type: nominationConstants.EXT_USER_NOMINATION_UPDATE_REQUEST, payload: {id, values} };
    }

    function success(mapping) {
      return { type: nominationConstants.EXT_USER_NOMINATION_UPDATE_SUCCESS, payload: mapping };
    }

    function failure(error) {
      return { type: nominationConstants.EXT_USER_NOMINATION_UPDATE_FAILURE, error };
    }
  },

  submit(id) {
    return dispatch => {
      dispatch(request(id));
      return nominationService.submit(id)
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
      return { type: nominationConstants.EXT_USER_NOMINATION_SUBMIT_REQUEST, payload: {id} };
    }

    function success(mapping) {
      return { type: nominationConstants.EXT_USER_NOMINATION_SUBMIT_SUCCESS, payload: mapping };
    }

    function failure(error) {
      return { type: nominationConstants.EXT_USER_NOMINATION_SUBMIT_FAILURE, error };
    }
  },  

  get(id) {
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
      return { type: nominationConstants.EXT_USER_NOMINATION_GET_REQUEST, payload: {id} };
    }

    function success(mapping) {
      return { type: nominationConstants.EXT_USER_NOMINATION_GET_SUCCESS, payload: mapping };
    }

    function failure(error) {
      return { type: nominationConstants.EXT_USER_NOMINATION_GET_FAILURE, error };
    }
  },

  remove(id) {
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
      return { type: nominationConstants.EXT_USER_NOMINATION_REMOVE_REQUEST, payload: {id}  };
    }

    function success(mapping) {
      return { type: nominationConstants.EXT_USER_NOMINATION_REMOVE_SUCCESS, payload: mapping };
    }

    function failure(error) {
      return { type: nominationConstants.EXT_USER_NOMINATION_REMOVE_FAILURE, error };
    }
  },
}

const nominationService = {
  create(values) {
    return api.post(Routing.generate('routes.api.externalUser.nominations.post'), values)
  },

  get(id) {
    return api.get(Routing.generate('routes.api.externalUser.nominations.get', {nominationId: id}))
  },

  remove(id) {
    return api.delete(Routing.generate('routes.api.externalUser.nominations.delete', {nominationId: id}))
  },

  submit(id) {
    return api.put(Routing.generate('routes.api.externalUser.nominations.submit', {nominationId: id}))
  },

  update(id, values) {
    return api.patch(Routing.generate('routes.api.externalUser.nominations.patch', {nominationId: id}), values)
  },
}