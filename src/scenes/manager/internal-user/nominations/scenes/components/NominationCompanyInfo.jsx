import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import {IoMdBusiness as IconIoMdBusiness} from 'react-icons/io'
import MsTeamsLogo from 'src/public/assets/img/teams-logo.png';
import {connect} from 'react-redux'
import { Can } from 'src/_helpers/permission';
import Routing from 'src/_helpers/routing';
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import ExternalLink from 'src/_components/pageElements/ExternalLink';

const NominationCompanyInfo = (props) => {

  let {company} = props

  return (
    <>
      <div>
        <div className="pull-left">
          <h1 className="external-user-access"><IconIoMdBusiness /> {company.name}</h1>
        </div> 
        <div className="pull-left h1-action-links">
          <Can I="do" a="acl:nominations/manage">
            <ActionButtonsGroup 
              itemId={company.uuid}
              onEdit={()=>props.history.push(Routing.generate('routes.ui.internalUser.companies.edit', {companyId: company.uuid}))}
            />
          </Can>
        </div>
        <div className="clearfix"/>
      </div>
      <Row gutter={8}>
        <Col span={12}>
          <div><span className="external-user-access">Website: {company.url ? <ExternalLink url={company.url}>{company.url}</ExternalLink> : ''}</span></div>              
          <div><span className="external-user-access">Origin: {props.countries[company.country] ? props.countries[company.country].name : company.country}</span></div>            

          <Can I="do" a="acl:lab_internal_info">
            <div> <img src={MsTeamsLogo} height="20px"/> MS Teams channel: {company.msTeamsChannelLink ? <ExternalLink url={company.msTeamsChannelLink}>Open</ExternalLink>: ''}</div>
          </Can>
        </Col>

        <Col span={12}>
          <div>
            <div className="text-strong">Company brief</div>
            <div dangerouslySetInnerHTML={{__html: company.companyBrief ? company.companyBrief.replace(/\n/g, "<br />") : ''}}/>
          </div>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = state => {
  return {
    countries: state.rootApp.countriesDictionary
  }
}

export default connect(mapStateToProps)(NominationCompanyInfo)