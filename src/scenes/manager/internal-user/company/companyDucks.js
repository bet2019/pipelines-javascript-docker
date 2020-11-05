import companyService from "./companyService";

export const companyConstants = {
  COMPANY_UPDATE_REQUEST: 'APP/COMPANY/UPDATE_REQUEST',
  COMPANY_UPDATE_SUCCESS: 'APP/COMPANY/UPDATE_SUCCESS',
  COMPANY_UPDATE_FAILURE: 'APP/COMPANY/UPDATE_FAILURE',

  COMPANY_GET_REQUEST: 'APP/COMPANY/GET_REQUEST',
  COMPANY_GET_SUCCESS: 'APP/COMPANY/GET_SUCCESS',
  COMPANY_GET_FAILURE: 'APP/COMPANY/GET_FAILURE',
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
    return { type: companyConstants.COMPANY_UPDATE_REQUEST, payload: {id, values} };
  }

  function success(mapping) {
    return { type: companyConstants.COMPANY_UPDATE_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: companyConstants.COMPANY_UPDATE_FAILURE, error };
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
    return { type: companyConstants.COMPANY_GET_REQUEST, payload: {id} };
  }

  function success(mapping) {
    return { type: companyConstants.COMPANY_GET_SUCCESS, payload: mapping };
  }

  function failure(error) {
    return { type: companyConstants.COMPANY_GET_FAILURE, error };
  }
}
