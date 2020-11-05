import React from 'react'
import { connect } from 'react-redux';
import Menu from 'antd/lib/menu'
import {IoIosArrowDown as IconIoIosArrowDown} from 'react-icons/io'
import { withTranslation } from 'react-i18next';
import {Link} from 'react-router-dom'
import Routing, { routesUI } from 'src/_helpers/routing';
import permissionAbility from 'src/_helpers/permission';
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';

class MainUserMenu extends React.Component {
  render() {

    const {i18n} = this.props

    return (
      <GlobalSettingsContext.Consumer>
        {
          ({menuShowHelpItem}) => {
            return (
              <nav id="uhf-g-nav-account" className="x-float-right ">
                <Menu className="c-select-menu x-hidden-mobile" mode="horizontal">     
                    <Menu.Item key="app-help" className="text-small-09" 
                      hidden={!menuShowHelpItem || !permissionAbility.can('do', 'acl:help/docs')}
                    >
                      <a
                        onClick={()=>this.props.history.push(Routing.generate(routesUI.internalUser.help))}
                      >
                        Help
                      </a>
                    </Menu.Item>
                  <Menu.SubMenu
                      title={
                        <span className="text-small-09">
                          {this.props.userName}
                          <IconIoIosArrowDown style={{fontSize: '10px'}}/>
                        </span>
                      }
                    >
                    <Menu.Item key="app-sign-out" className="text-small-09">
                      <a onClick={this.props.logoutAction}>{i18n.t('main_menu.signout')}</a>
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
                {/* <ul>
                  <li>
                    <div className="c-select-menu x-hidden-mobile">
                      <a >{this.props.userName}</a>
                      <ul id="unique-id-for-list" role="menu" className="c-menu" aria-label="unique-id-for-list" aria-hidden="true">
                        <li className="c-menu-item" role="menuitem">
                        
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul> */}
              </nav>
            )
          }
        }
      </GlobalSettingsContext.Consumer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.authentication.user.fullName,
  }
}
export default connect(mapStateToProps)(withTranslation()(MainUserMenu))