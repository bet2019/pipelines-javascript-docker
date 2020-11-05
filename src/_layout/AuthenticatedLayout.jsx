// @flow

import React            from "react";
import {connect}        from 'react-redux'
import FlashBag         from "src/_layout/components/FlashBag";
import PageFooter       from "src/_layout/components/PageFooter";
import PageHeader       from "./components/PageHeader";

class AuthenticatedLayout extends React.Component {
  render() {
    const {component: Component, ...rest} = this.props

    return (
      <>
          <PageHeader 
            logout={this.props.logout}
            {...rest}
          />

          <div data-grid="container stack-3" id="mainContent-container" className="en-US">
              <main id="mainContent" data-grid="col-12">
                <article>
                  <FlashBag/>
                  <Component {...rest}/>          
                </article>
              </main>
          </div>
          <PageFooter/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userIsInternal: state.authentication.user.isInternal
  }
}

export default connect(mapStateToProps)(AuthenticatedLayout);
