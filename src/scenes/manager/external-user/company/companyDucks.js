import companyService from "./companyService";

export const companyConstants = {
  EXT_USER_COMPANY_UPDATE_REQUEST: 'EXT_USER_APP/COMPANY/UPDATE_REQUEST',
  EXT_USER_COMPANY_UPDATE_SUCCESS: 'EXT_USER_APP/COMPANY/UPDATE_SUCCESS',
  EXT_USER_COMPANY_UPDATE_FAILURE: 'EXT_USER_APP/COMPANY/UPDATE_FAILURE',

  EXT_USER_COMPANY_GET_REQUEST: 'EXT_USER_APP/COMPANY/GET_REQUEST',
  EXT_USER_COMPANY_GET_SUCCESS: 'EXT_USER_APP/COMPANY/GET_SUCCESS',
  EXT_USER_COMPANY_GET_FAILURE: 'EXT_USER_APP/COMPANY/GET_FAILURE',
}

export const companyActions = {
  update,
  get
}

function update(id, values) {
  return dispatch => {
    dispatch(request(id, values));
    return companyService.update(id, values)
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
    return { type: companyConstants.EXT_USER_COMPANY_UPDATE_REQUEST, payload: {id, values} };
  }

  function success(mapping) {
    return { type: companyConstants.EXT_USER_COMPANY_UPDATE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: companyConstants.EXT_USER_COMPANY_UPDATE_FAILURE, error };
  }
}


function get(id) {
  return dispatch => {
    dispatch(request(id));
    return companyService.get(id)
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
    return { type: companyConstants.EXT_USER_COMPANY_GET_REQUEST, payload: {id} };
  }

  function success(mapping) {
    return { type: companyConstants.EXT_USER_COMPANY_GET_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: companyConstants.EXT_USER_COMPANY_GET_FAILURE, error };
  }
}
