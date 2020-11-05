import React from 'react'
import TelemetryService from 'src/_helpers/TelemetryService'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    TelemetryService.trackException(error)
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center mg-t-40">
          <h1>Ooops, something went wrong, <br/>we will fix that as soon as possible!</h1>
        </div>
    }

    return this.props.children; 
  }
}

export default ErrorBoundary