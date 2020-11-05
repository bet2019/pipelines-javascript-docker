import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import history from 'src/_helpers/history';

const TelemetryService = () => {

  let appInsights = null 
  let reactPlugin = null
  let initialized = false

  const initialize = () => {
    reactPlugin = new ReactPlugin()
    appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: process.env.APP_APPLICATION_INSIGHTS_KEY,
        enableAutoRouteTracking: true,
        maxBatchInterval: 2000,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: history }
        }
      }
    })

    if (process.env.APP_ENV === 'prod' && !Boolean(initialized)) {
      initialized = true
      appInsights.loadAppInsights()
    }
  }

  const isInitialized = () => {
    return null !== appInsights && appInsights.appInsights.isInitialized()
  }

  const trackException = (exception, properties = {}) => {
    if (isInitialized()) {
      appInsights.trackException({ exception, properties })
    }
  }

  const trackPageView = (name, properties = {}) => {
    if (isInitialized()) {
      appInsights.trackPageView({ name, properties })
    }
  }

  const trackEvent = (name, properties = {}) => {
    if (isInitialized()) {
      appInsights.trackEvent({ name, properties })
    }
  }

  const getAppInsights = () => {
    return appInsights
  }

  return {
    getAppInsights,
    reactPlugin,
    initialize,
    isInitialized,
    trackException,
    trackPageView,
    trackEvent,
  }
}

export default TelemetryService()
