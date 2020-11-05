import Routing, { routesAPI } from "src/_helpers/routing";
import api from "src/_helpers/api";

export const nominationWriteupConstants = {
  NOMINATION_WRITEUP_CREATE_NEW_REQUEST: 'APP/NOMINATION_WRITEUP/CREATE_NEW_REQUEST',
  NOMINATION_WRITEUP_CREATE_NEW_SUCCESS: 'APP/NOMINATION_WRITEUP/CREATE_NEW_SUCCESS',
  NOMINATION_WRITEUP_CREATE_NEW_FAILURE: 'APP/NOMINATION_WRITEUP/CREATE_NEW_FAILURE',

  NOMINATION_WRITEUP_UPDATE_REQUEST: 'APP/NOMINATION_WRITEUP/UPDATE_REQUEST',
  NOMINATION_WRITEUP_UPDATE_SUCCESS: 'APP/NOMINATION_WRITEUP/UPDATE_SUCCESS',
  NOMINATION_WRITEUP_UPDATE_FAILURE: 'APP/NOMINATION_WRITEUP/UPDATE_FAILURE',

  NOMINATION_WRITEUP_GET_REQUEST: 'APP/NOMINATION_WRITEUP/GET_REQUEST',
  NOMINATION_WRITEUP_GET_SUCCESS: 'APP/NOMINATION_WRITEUP/GET_SUCCESS',
  NOMINATION_WRITEUP_GET_FAILURE: 'APP/NOMINATION_WRITEUP/GET_FAILURE',
}

export const nominationWriteupActions = {
  create(nominationId, values) {
    return dispatch => {
      dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_CREATE_NEW_REQUEST, payload: values });
      return nominationWriteupService.create(nominationId, values)
        .then((response) => {
          dispatch({type: nominationWriteupConstants.NOMINATION_WRITEUP_CREATE_NEW_SUCCESS, payload: response.data});
          return response;
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_CREATE_NEW_FAILURE, error: e.response.data});
          }
          throw e
        });
    };
  },

  update(nominationId, writeupId, values) {
    return dispatch => {
      dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_UPDATE_REQUEST, payload: {nominationId, writeupId, values}});
      return nominationWriteupService.update(nominationId, writeupId, values)
        .then((response) => {
          dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_UPDATE_SUCCESS, payload: response.data});
          return response;
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_UPDATE_FAILURE, error: e.response.data});
          }
          throw e
        });
    };
  },

  get(nominationId, writeupId) {
    return dispatch => {
      dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_GET_REQUEST, payload: {nominationId, writeupId} });
      return nominationWriteupService.get(nominationId, writeupId)
        .then((response) => {
          dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_GET_SUCCESS, payload: response.data});
          return response;
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            dispatch({ type: nominationWriteupConstants.NOMINATION_WRITEUP_GET_FAILURE, error: e.response.data});
          }
          throw e
        });
    };
  },
}

const nominationWriteupService = {
  create(nominationId, values) {
    return api.post(Routing.generate(routesAPI.internal.nominations.writeups.post, {nominationId}), values)
  },

  get(nominationId, writeupId) {
    return api.get(Routing.generate(routesAPI.internal.nominations.writeups.get, {nominationId, writeupId}))
  },

  update(nominationId, writeupId, values) {
    return api.patch(Routing.generate(routesAPI.internal.nominations.writeups.patch, {nominationId, writeupId}), values)
  },
}