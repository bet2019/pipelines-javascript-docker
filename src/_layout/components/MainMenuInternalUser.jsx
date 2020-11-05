import React from 'react'
import {Link} from 'react-router-dom'
import Routing, { routes, routesUI } from 'src/_helpers/routing';
import Menu from 'antd/lib/menu'
import {IoMdSettings as IconIoMdSettings} from 'react-icons/io'
import permissionAbility from 'src/_helpers/permission';
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';

class MainMenuInternalUser extends React.Component { 
  render() {
    return <>
<GlobalSettingsContext.Consumer>
  {
    ({menuShowPowerbiItem}) => {
      return (
      <Menu /* onClick={this.handleClick} selectedKeys={[this.state.current]} */ mode="horizontal">
        <Menu.Item key={Routing.generate('routes.ui.manager')}>
          <Link to={Routing.generate('routes.ui.manager')}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={Routing.generate('routes.ui.internalUser.nominations._self')} 
          hidden={!permissionAbility.can('do', 'acl:nominations/list')
        }>
          <Link to={Routing.generate('routes.ui.internalUser.nominations._self')}>Nominations</Link>
        </Menu.Item>
        <Menu.Item key={Routing.generate(routesUI.internalUser.calendar.nominationEvents)} 
          hidden={!permissionAbility.can('do', 'acl:nominations/manage')
        }>
          <Link to={Routing.generate(routesUI.internalUser.calendar.nominationEvents)}>Schedule</Link>
        </Menu.Item>
        <Menu.Item key={Routing.generate('routes.ui.internalUser.users._self')}
          hidden={!permissionAbility.can('do', 'acl:users/manage')}
        >
          <Link to={Routing.generate('routes.ui.internalUser.users._self')}>Users</Link>
        </Menu.Item>
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              Reports
            </span>
          }
          hidden={!permissionAbility.can('do', 'acl:reports/view')}
        >
          <Menu.Item key={routesUI.internalUser.reports.internalProductFeedback}
            hidden={!permissionAbility.can('do', 'acl:reports/view')}
          >
            <Link to={routesUI.internalUser.reports.internalProductFeedback}>
              Internal Product feedback
            </Link>
          </Menu.Item>

          <Menu.Item key={routesUI.internalUser.reports.customerProductFeedback}
            hidden={!permissionAbility.can('do', 'acl:reports/view')}
          >
            <Link to={routesUI.internalUser.reports.customerProductFeedback}>
              Customer Product feedback
            </Link>
          </Menu.Item>

          <Menu.Item key={routesUI.internalUser.reports.labSubmittedCompletedNominationsStat}
            hidden={!permissionAbility.can('do', 'acl:reports/view')}
          >
            <Link to={routesUI.internalUser.reports.labSubmittedCompletedNominationsStat}>
              Submitted & Completed nominations stat
            </Link>
          </Menu.Item>

          <Menu.Item key={routesUI.internalUser.reports.labCompletedNominationsSummary}
            hidden={!permissionAbility.can('do', 'acl:reports/view')}
          >
            <Link to={routesUI.internalUser.reports.labCompletedNominationsSummary}>
              Completed nominations summary
            </Link>
          </Menu.Item>

          <Menu.Item key={routesUI.internalUser.reports.labUpcomingNominations}
            hidden={!permissionAbility.can('do', 'acl:reports/view')}
          >
            <Link to={routesUI.internalUser.reports.labUpcomingNominations}>
              Upcoming nominations
            </Link>
          </Menu.Item>
          <Menu.Item key={routesUI.internalUser.reports.powerBiReport}
            hidden={!menuShowPowerbiItem || !permissionAbility.can('do', 'acl:reports/view')}
          >
            <Link to={routesUI.internalUser.reports.powerBiReport}>
              PowerBi Portal Stat
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <IconIoMdSettings />&nbsp;
              Settings
            </span>
          }
          hidden={!permissionAbility.can('do', 'acl:settings/manage')}
        >
            <Menu.Item key={Routing.getRoute('routes.ui.internalUser.labs.list')}
              hidden={!permissionAbility.can('do', 'acl:labs/manage')}
            >
            <Link to={Routing.getRoute('routes.ui.internalUser.labs.list')}>
                Labs
              </Link>
            </Menu.Item>
            <Menu.Item key={Routing.getRoute('routes.ui.internalUser.settings.nominationSources.list')}
              hidden={!permissionAbility.can('do', 'acl:settings/manage')}
            >
              <Link to={Routing.getRoute('routes.ui.internalUser.settings.nominationSources.list')}>
                Nomination sources
              </Link>
            </Menu.Item>
            <Menu.Item key={Routing.getRoute('routes.ui.internalUser.settings.industryVertical.list')}
              hidden={!permissionAbility.can('do', 'acl:settings/manage')}
            >
              <Link to={Routing.getRoute('routes.ui.internalUser.settings.industryVertical.list')}>
                Industry verticals
              </Link>
            </Menu.Item>
            <Menu.Item key={Routing.getRoute('routes.ui.internalUser.settings.customerChannel.list')}
              hidden={!permissionAbility.can('do', 'acl:settings/manage')}
            >
              <Link to={Routing.getRoute('routes.ui.internalUser.settings.customerChannel.list')}>
                Customer channel
              </Link>
            </Menu.Item>
            <Menu.Item key={Routing.getRoute('routes.ui.internalUser.settings.acl.list')}
              hidden={!permissionAbility.can('do', 'acl:settings/manage')}
            >
            <Link to={Routing.getRoute('routes.ui.internalUser.settings.acl.list')}>
                Roles & Permission
              </Link>
            </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      )}
    }
    </GlobalSettingsContext.Consumer>
    </>
  }
}

export default MainMenuInternalUser