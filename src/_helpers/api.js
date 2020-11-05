import axios                from "axios";
import { store }            from "src/_helpers/store";
import FormSubmissionError  from "src/_helpers/FormSubmissionError";
import history              from "src/_helpers/history";
import toQueryString        from "src/_helpers/toQueryString";
import { authProvider, authenticationParameters } from "./authProvider";
import jwt                  from 'jsonwebtoken'
import { MsalAuthProvider } from "react-aad-msal";
import { InteractionRequiredAuthError } from "msal";
import fileDownload  from 'downloadjs'
import TelemetryService from "./TelemetryService";

export const apiStatic = axios;

let isRefreshing = false;
let failedQueue = [];

const api = axios.create({
  baseURL: process.env.APP_API_BASE_URL,
  withCredentials: true
});
const processQueue = (error, token = null) => {
  console.warn('processing failedQueue length '+failedQueue.length)
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
}


api.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
api.defaults.paramsSerializer = function(params) {
  return toQueryString(params, true);
};

export async function getIdToken() {
  console.warn('executing getIdToken()')
  let token = null
  let idToken = null
  try {
    token = await authProvider.getIdToken();
    idToken = token.idToken.rawIdToken;
    let tokenPayload = jwt.decode(idToken)

    console.warn('decoded token: ', tokenPayload)
    
    if (!tokenPayload.email) {
    }     
  } catch (error) {
    console.warn('request getIdToken error: ',JSON.stringify(error))
    if (error instanceof InteractionRequiredAuthError.isInteractionRequiredError
      || error.errorCode == 'user_login_error') {
      try {
        await authProvider.login()
        token = await authProvider.getIdToken();
        idToken = token.idToken.rawIdToken;
        if (!tokenPayload.email) {
        }
      } catch (err2) {
        console.warn('request getIdToken error2: ', JSON.stringify(err2))
        await forceLogoutAndRedirectToHome()
        throw err2
      }
    } else {
      await forceLogoutAndRedirectToHome()
      throw error
    }
  }  

  return idToken
}

function setTheToken(config, token) {
  if (token) {
    config.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete config.headers.common["Authorization"];
  }

  return config
} 

function clearStorage() {
  localStorage.clear()

  // delete cookies
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

async function forceLogoutAndRedirectToHome() {
  if (confirm('You will be redirected to login page again, you may press Cancel and save data that has been entered!')) {
    clearStorage()
    history.replace({ pathname: "/" });
  } else {
    throw new Error('A confirmation to relogin was canceled')
  }
}

api.interceptors.request.use(async function (config) {
  // Do something with the request before sending

  let idToken = await getIdToken()
  console.warn('request interceptor has a token now: ', idToken)

  config = setTheToken(config, idToken)
  return config
  
}, function (error) {
  // Do something with request error
  TelemetryService.trackException(error)
  return Promise.reject(error);
})


api.interceptors.response.use(function(response) {
  // Do something with the received response
  if (response.data instanceof Blob) {
    let disposition = response.headers['content-disposition']
    let filename="file.name"
    if (disposition) {
      filename = decodeURI(disposition.match(/filename="(.*)"/)[1])
    }
    fileDownload(response.data, filename);
    return Promise.resolve()
  }
  
  return response;
}, function(error) {
  
  TelemetryService.trackException(error)

  if (error && error.response !== undefined) {
    switch (error.response.status) {
      case 401:
        const originalRequest = error.config;

        if (!originalRequest._retry) {
            
            if (isRefreshing) {
              return new Promise(function(resolve, reject) {
                failedQueue.push({resolve, reject})
              }).then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return api(originalRequest);
              }).catch(err => {
                return Promise.reject(err);
              })
            }

          originalRequest._retry = true;
          isRefreshing = true;

          // return new Promise(async function (resolve, reject) {
            return getIdToken()
              .then( token => {              
                setTheToken(api.defaults, token)
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                processQueue(null, token);
                // return resolve(api(originalRequest));
                return api(originalRequest);
              })
              .catch(err => {
                console.warn('catched auth fail in a response retry',err)
                processQueue(err, null);
                // return reject(err);
                Promise.reject(err);
              })
              .then(() => { isRefreshing = false })
          // })
        }
        
        break;
      case 403:
        break;
      case 431:
        alert('Request Header Fields Too Large. Please clear the cookies and try again')
        break;
      case 498:
        clearStorage()
        location.reload(true)
        return Promise.reject(error);
        break;
      // case 500:
      // case 404:
      // case 400:

    }

    if (error.response.data) {
      if (error.response.data.errors 
        && (error.response.data.errors.length > 0 
          || (error.response.data.errors.details && error.response.data.errors.details.length > 0)
           )
        ) {
        throw new FormSubmissionError(error.response.data.errors);
      } else {
        alert(error.response.data.message || error.response.data.error_description || "Error occurred");
      }
    }
  }

  return Promise.reject(error);
});

store.subscribe(() => {
  const state = store.getState(); 
  // let token = state.authentication.addResponse ? state.authentication.addResponse.jwtIdToken : null;

  // if (token) {
  //   api.defaults.headers.common["Authorization"] = "Bearer " + token;
  // } else {
  //   delete api.defaults.headers.common["Authorization"];
  // }
});

export default api;
