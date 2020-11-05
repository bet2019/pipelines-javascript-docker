import React from 'react'
import {connect} from 'react-redux'
import AuthenticatedLayout from "src/_layout/AuthenticatedLayout";
import InternalUserContainer from "src/scenes/manager/internal-user";
import ExternalUserContainer from "src/scenes/manager/external-user";
import { authProvider } from 'src/_helpers/authProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { store } from 'src/_helpers/store';
import { authAction } from 'src/authAction';
import TelemetryService from 'src/_helpers/TelemetryService';
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';

class Manager extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      appBootstrapData: {
        globalSettings: {}
      }
    }
  }

  render() {
    const {hasAddResponse, isAuthenticated, user, isBootstrapped, ...rest} = this.props

    if (hasAddResponse &&
      (!isAuthenticated || !user || !isBootstrapped)) {
      this.props.dispatch(authAction.appBootstrap())
      .then(res => {
        this.setState({
          appBootstrapData: res
        })
      })
      return (
        <p>Loading...</p>
      )
    }
    return (
      <AzureAD provider={authProvider} reduxStore={store} forceLogin={true}>
      {
        ({login, logout, authenticationState, error, accountInfo}) => {
          switch (authenticationState) {
            case AuthenticationState.Authenticated:
            
              if (!hasAddResponse
                || !isAuthenticated 
                || !user 
                || !isBootstrapped) {
                  
                return (
                  <p>Authenticating...</p>
                )
              } else {
                if (TelemetryService.isInitialized() && user && user.uuid) {
                  TelemetryService.getAppInsights().setAuthenticatedUserContext(user.uuid)
                }
                return (
                  <GlobalSettingsContext.Provider value={this.state.appBootstrapData.globalSettings}>
                    <AuthenticatedLayout
                      logout={logout}
                      component={(user.isInternal) ? InternalUserContainer : ExternalUserContainer}
                      {
                        ...rest
                      }
                    />
                  </GlobalSettingsContext.Provider>
                );
              }
            case AuthenticationState.Unauthenticated:
              return (
                <div>
                  {error && <p><span>An error occured during authentication, please try again!</span></p>}
                  <p>
                    <button onClick={login}>Login</button>
                  </p>
                </div>
              );
            case AuthenticationState.InProgress:
              return (<p>Authenticating...</p>);
          }
        }
      }

      </AzureAD>
    )
    // if (!isAuthenticated) {
    //   return <NotAuthenticatedLayout component={<div>Not Auth</div>}/>
    // }

    // return (
    //     <AuthenticatedLayout
    //       component={(true) ? InternalUserDashboard : ExternalUserDashboard}
    //     />
    // )
  }
}

const mapStateToProps = (state) => {
  return {
    isBootstrapped: state.rootApp.isBootstrapped,
    isAuthenticated: state.authentication.isAuthenticated,
    hasAddResponse: !!state.authentication.addResponse,
    user: state.authentication.user
  }
}

export default connect(mapStateToProps)(Manager)