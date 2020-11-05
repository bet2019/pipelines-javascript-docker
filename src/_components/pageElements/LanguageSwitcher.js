import React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import {
  IoMdGlobe as IconIoMdGlobe,
  IoIosArrowDown as IconIoIosArrowDown
} from 'react-icons/io'
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = (props) => {
  const { i18n } = useTranslation();
  
  const menu = (
    <Menu>
      <Menu.Item key="en" onClick={()=>{i18n.changeLanguage('en'); location.reload();}}>{i18n.t('lang.english')}</Menu.Item>
      <Menu.Item key="zh" onClick={()=>{i18n.changeLanguage('zh'); location.reload();}}>{i18n.t('lang.chinese')}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['hover']} {...props}>
      <a className="ant-dropdown-link text-small-09 mg-r-20" href="#" style={{paddingTop: "17px"}}>
        <IconIoMdGlobe /> <IconIoIosArrowDown  style={{fontSize: '10px'}}/>
      </a>
    </Dropdown>
  )
}

export default LanguageSwitcher