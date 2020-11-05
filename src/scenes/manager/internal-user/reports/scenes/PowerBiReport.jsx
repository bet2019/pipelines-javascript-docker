import React, { useState, useEffect, useContext } from 'react'
import PowerBIEmbedded from 'react-powerbi';
import { Can } from 'src/_helpers/permission';
import PageTitle from 'src/_components/PageTitle';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import reportService from '../reportService';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';
import NotAuthorized_403 from 'src/_components/errors/NotAuthorized_403';

const PowerBiReport = (props) => {

  let [embedConfig, setEmbedConfig] = useState(null)
  let {menuShowPowerbiItem} = useContext(GlobalSettingsContext)

  useEffect(()=>{
    if (menuShowPowerbiItem){
      reportService.getPowerBiReportConfig()
      .then(res => {
        setEmbedConfig({
          type: 'report',
          tokenType: 1,// => models.TokenType.Embed,
          accessToken: res.data.accessToken,
          embedUrl: res.data.embedUrl,
          id: res.data.reportId,
          // settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true,
            layoutType: 1,// => models.LayoutType.MobilePortrait
          // },
          // height: "100%"
        })
      })
    }
  }, [menuShowPowerbiItem])

  if (!menuShowPowerbiItem) {
    return <NotAuthorized_403 />
  }

  if (!embedConfig) {
    return <LogoLoadingSpinner />
  }

  return (
    <Can I="do" a="acl:reports/view">
      <PageTitle title="Report :: PowerBi Portal Stat">
        <section className="report">
          <Row className="mg-t-20">
            <Col id="powerbi-content">
              <PowerBIEmbedded
                {...embedConfig}
                biConfig={embedConfig}
              />
            </Col>
          </Row>
        </section>
      </PageTitle>
    </Can>    
  )
}

export default PowerBiReport