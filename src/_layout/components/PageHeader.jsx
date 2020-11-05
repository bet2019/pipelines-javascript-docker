import React from "react";
import MainMenuInternalUser from "src/_layout/components/MainMenuInternalUser";
import MainUserMenu from "src/_layout/components/MainUserMenu";
import MainMenuExternalUser from "./MainMenuExtrenalUser";
import Routing from "src/_helpers/routing";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import logo from 'src/public/assets/img/microsoft-gray.png'
import LanguageSwitcher from "src/_components/pageElements/LanguageSwitcher";

class PageHeader extends React.Component {
  render() {
    return (
        <nav>
          {
            process.env.APP_ENV != 'prod'
            ? <div className="app-env-notice">{`${process.env.APP_CODE} ${process.env.APP_ENV}`}</div>
            : ''
          }
                      
          <section id="headerArea">
            <div id="headerRegion">
              <div id="headerUniversalHeader">
                <header className="c-universal-header context-uhf">
                  <div className="theme-light js-global-head f-transparent">
                    <div>
                      <button className="c-action-trigger c-glyph glyph-global-nav-button" aria-label="Toggle menu" aria-expanded="false" title="Microsoft IoT &amp; AI Insider Labs" id="iot-button-mobilenav"></button>

                      <Link to={Routing.generate('routes.ui.manager')} className="c-logo">
                        <img src={logo} className="c-image" />
                        
                      </Link>

                      <div className="f-mobile-title" id="iot-title-menu">
                        <Link to={Routing.generate('routes.ui.manager')} >
                          <span data-global-title="Microsoft home" className="js-mobile-title x-type-left">Microsoft IoT &amp; AI Insider Labs</span>
                        </Link>
                      </div>

                      <nav id="uhf-g-nav">
                          {
                            this.props.userIsInternal
                              ? <MainMenuInternalUser />
                              : <MainMenuExternalUser />
                          }
                        {/* <ul> //FIXME: mobile version should show user menu
                          <li className="x-visible-mobile">
                            <a className="c-hyperlink ng-binding" href="https://apply.microsoftiotinsiderlabs.com/Account/LogOff">v-antonr@microsoft.com - Sign Out</a>
                          </li>
                          <li>

                            <a className="c-hyperlink ng-binding" href="https://apply.microsoftiotinsiderlabs.com/Nomination/MyNominations?loc=en">My Nominations</a>
                          </li>
                        </ul> */}
                      </nav>
                      <MainUserMenu
                        logoutAction={this.props.logout}
                        history={this.props.history}
                      />
                      {
                        this.props.userIsInternal
                        ? ''
                        : <LanguageSwitcher className="pull-right"/>
                      }                      
                    </div>
                  </div>
                  <div id="iot-page-header">
                    <div className="c-logo">
                      <span>{this.props.currentPageTitle}</span>
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </section>
        </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userIsInternal: state.authentication.user.isInternal,
    currentPageTitle: state.rootApp.currentPageTitle
  }
}

export default connect(mapStateToProps)(PageHeader);
