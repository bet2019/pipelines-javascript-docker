import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Logger, LogLevel } from 'msal';

const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: process.env.APP_AAD_APPLICATION_ID,
    redirectUri: [process.env.APP_AAD_REDIRECT_URL],
    postLogoutRedirectUri: `${process.env.APP_AAD_REDIRECT_URL}`,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  },
  system: {
    logger: new Logger(
      (logLevel, message, containsPii) => {
        console.log('[MSAL]', message);
      },
      {
        level: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    ),
  },
};

const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin+'/auth.html',
}

export const authenticationParameters = {
  scopes: [
    'openid',
    'email',
    // `api://${process.env.APP_AAD_APPLICATION_ID}/api`,
    'profile'
    // '<property (i.e. user.read)>',
    // 'https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>'
  ]
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)