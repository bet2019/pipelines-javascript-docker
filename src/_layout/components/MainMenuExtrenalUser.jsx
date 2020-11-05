import React from 'react'
import {Link} from 'react-router-dom'
import Routing from 'src/_helpers/routing';
import Menu from 'antd/lib/menu'
import { withTranslation } from 'react-i18next';

class MainMenuExternalUser extends React.Component {
  render() {

    const {i18n} = this.props

    return <>
      <Menu mode="horizontal">
        <Menu.Item key={Routing.generate('routes.ui.externalUser.nominations._self')}>
          <Link to={Routing.generate('routes.ui.externalUser.nominations._self')}>{i18n.t('main_menu.nominations')}</Link>
        </Menu.Item>        
      </Menu>
    </>
  }
}

export default withTranslation()(MainMenuExternalUser)