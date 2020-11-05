import { appConstants } from "./ducksApp";

export const authConstants = {
  LOGOUT: "LOGOUT"
};

const initialState = {
  isAuthenticated: false,  
  user: null,
  addResponse: null
};

export default function authReducer(state = initialState, action = {}) {

  switch (action.type) {
    case 'AAD_LOGIN_SUCCESS':
      return {
        ...state,
        addResponse: action.payload
      }    
    case 'AAD_LOGOUT_SUCCESS':
    case 'AAD_LOGIN_FAILED':
    case authConstants.LOGOUT:
      return initialState;

    case appConstants.BOOTSTRAP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    default:
      return state;
  }
}
