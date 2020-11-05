import React from 'react';
import { nominationActions } from '../nominationDucks';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import { connect } from "react-redux";
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button'
import Menu from 'antd/lib/menu'
import Routing from 'src/_helpers/routing';
import BtnDelete from 'src/_components/ui/BtnDelete';
import PageTitle from 'src/_components/PageTitle';
import { withTranslation } from 'react-i18next';
import FormatDateString from 'src/_components/FormatDateString';
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import ExternalLink from 'src/_components/pageElements/ExternalLink';

const excludedStatuses = ['draft', 'deleted']

class NominationDetails extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      submitLoading: false
    }
  }

  componentDidMount() {
    return this.fetchData()
  }

  fetchData() {
    return this.props.dispatch(nominationActions.get(this.props.match.params.nominationId))
    .then( res => {
      this.setState({
        data: res.data
      })
    })
  }

  onConfirmDelete = (id) => {
    return this.props.dispatch(nominationActions.remove(id))
    .then(res=>(
      this.props.history.replace(Routing.generate('routes.ui.externalUser.nominations._self'))
    ))
  }

  changeStatusAndReload(id, statusId) {
    return this.props.dispatch(nominationActions.update(id, {statusId}))
    .then( res => this.fetchData())
  }

  statusMenu = () => {
    return (
      <Menu>
        {
          Object.keys(this.props.nominationStatuses).map(status => {
            return [...excludedStatuses, this.state.data.statusId].indexOf(status) !== -1
            ? ''
            : <Menu.Item key={status}>
                <a onClick={()=>this.changeStatusAndReload(this.state.data.uuid, status)}>{status}</a>
              </Menu.Item>
          })
        }
      </Menu>
    )
  };

  renderItemDetails() {
    
    const {i18n} = this.props

    let item = this.state.data
    let company = item.company
    return (
      <>
      <div className="mg-t-20">
        <Row gutter={8}>
          <Col span={16}>
            <div className="pull-left">
              <h1>{company.name}</h1>
            </div>
            <div className="pull-left h1-action-links">
                <ActionButtonsGroup 
                  itemId={company.uuid}
                  onEdit={()=>this.props.history.push(Routing.generate('routes.ui.externalUser.companies.edit', {companyId: company.uuid}))}
                />
            </div>
            <div className="clearfix"/>
            
          </Col>
          <Col span={8}>            
            <div>{i18n.t('nominations:label.country')}: {this.props.countries[company.country] ? this.props.countries[company.country].name : company.country}</div>            
            <div>{i18n.t('nominations:label.website')}: {company.url ? <ExternalLink url={company.url}>{company.url}</ExternalLink> : ''}</div>
          </Col>
        </Row>

        <Row className="mg-t-20">
          <Col span={24}>
            <div className="pull-left">
              <h1>{i18n.t('nominations:page.section_title.nomination_details')}</h1>
            </div>
            <div className="pull-left h1-action-links">
              {
                item.submittedAt === null
                ? <ActionButtonsGroup 
                    itemId={item.uuid}
                    onEdit={()=>this.props.history.push(Routing.generate('routes.ui.externalUser.nominations.edit', {nominationId: item.uuid}))}
                    onDelete={()=>this.onConfirmDelete(item.uuid)}
                  />
                : ''
              }              
            </div>
            <div className="clearfix"/>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={8}>
            <Card title={i18n.t('nominations:page.section_title.company_contact')} size="small">
              <dl className="dl-horizontal dd-right">
                <dt>{i18n.t('nominations:label.contact_person_name')}</dt><dd>{item.contactPersonName}{item.contactPersonRole?` - ${item.contactPersonRole}`:''}</dd>
                <dt>{i18n.t('nominations:label.contact_person_email')}</dt><dd>{item.contactPersonEmail}</dd>
                <dt>{i18n.t('nominations:label.contact_person_phone')}</dt><dd>{item.contactPersonPhone}</dd>
              </dl>
            </Card>
          </Col>
          <Col span={8}>
            <Card title={i18n.t('nominations:page.section_title.msft_contact')} size="small">
              {item.microsoftContactName} <br/>
              {item.microsoftContactEmail}
            </Card> 
          </Col>
          <Col span={8}>
            <Card size="small"> 
              <dl className="dl-horizontal dd-right">
                <dt>{i18n.t('nominations:label.industry_vertical')}</dt><dd>{item.industryVertical ? item.industryVertical.name : ''}</dd>
                <dt>{i18n.t('nominations:label.lab_location')}</dt><dd>{item.lab.name}</dd>
                <dt>{i18n.t('nominations:label.status')}</dt><dd><strong>{this.props.nominationStatuses[item.statusId].name}</strong></dd>
                {
                  item.submittedAt !== null
                  ? <><dt>{i18n.t('nominations:label.submitted')}</dt><dd><FormatDateString text={item.submittedAt}/></dd></>
                  : ''
                }
              </dl>
              <div className="text-center">
              {
                  item.submittedAt === null
                  ? <Button 
                      loading={this.state.submitLoading}
                      onClick={()=>{
                        this.setState({submitLoading: true})
                        this.props.dispatch(nominationActions.submit(item.uuid))
                        .then( res => {                          
                          return this.fetchData()
                        })
                        .finally ( res => {
                          this.setState({submitLoading: false})
                        })
                      }} 
                      type="primary">{i18n.t('nominations:label.submit')}</Button>
                  : ''
                }              
              </div>
            </Card>
          </Col>          
        </Row>

        <Row gutter={16} className="mg-t-20">
          <Col span={12}>
            <Card size="small">
              <dl className="dl-vertical-with-padding">
                <dt>{i18n.t('nominations:label.engineers_visiting')}:</dt><dd>{item.numOfEngineers}</dd>
                <dt>{i18n.t('nominations:label.project_phase')}:</dt>                
                <dd dangerouslySetInnerHTML={{ __html: item.projectPhase ? item.projectPhase.replace(/\n/g, "<br />") : ''} }/>
              </dl>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small">
              <dl className="dl-vertical-with-padding">
                <dt>{i18n.t('nominations:label.azure_lifetime_consumption')}:</dt><dd>{item.azureCloudConsumptionLifetime}</dd>
                <dt>{i18n.t('nominations:label.azure_consumption')}:</dt><dd>{item.azureCloudConsumption}</dd>
                <dt>{i18n.t('nominations:label.azure_subscription')}:</dt><dd>{item.azureSubscriptionGuid}</dd> 
              </dl>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} className="mg-t-20">
          <Col span={12}>
            <h2>{i18n.t('nominations:page.section_title.marketing_and_business')}</h2>
            <dl className="dl-vertical-with-padding">
              <dt>{i18n.t('nominations:label.iot_opportunity')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.iotOpportunity ? item.iotOpportunity.replace(/\n/g, "<br />") : ''} }/>
              <dt>{i18n.t('nominations:label.projected_annual_revenue')}:</dt><dd>{item.projectedAnnualRevenue}</dd>
              <dt>{i18n.t('nominations:label.current_status')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.currentStatusDesc ? item.currentStatusDesc.replace(/\n/g, "<br />") : ''} }/>
              <dt>{i18n.t('nominations:label.market_and_customer_benefits')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.marketOpportunity ? item.marketOpportunity.replace(/\n/g, "<br />") : ''} }/>
              <dt>{i18n.t('nominations:label.projected_sold_annually')}:</dt><dd>{item.projectedSoldAnnually}</dd>
              <dt>{i18n.t('nominations:label.product_phases_desc')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.productPhasesDesc ? item.productPhasesDesc.replace(/\n/g, "<br />") : ''} }/>
            </dl>
          </Col>
          <Col span={12}>
            <h2>{i18n.t('nominations:page.section_title.technology_and_objectives')}</h2>
            <dl className="dl-vertical-with-padding">
            <dt>{i18n.t('nominations:label.iot_design')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.iotDesign ? item.iotDesign.replace(/\n/g, "<br />") : ''} }/>
              <dt>{i18n.t('nominations:label.msft_technology')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.microsoftTechnologies ? item.microsoftTechnologies.replace(/\n/g, "<br />") : ''} }/>
              <dt>{i18n.t('nominations:label.prioritized_workstreams')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.prioritizedWorkStreamDesc ? item.prioritizedWorkStreamDesc.replace(/\n/g, "<br />") : ''} }/>
              <dt>{i18n.t('nominations:label.iot_cloud_technologies')}:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.iotCloudTechnologies ? item.iotCloudTechnologies.replace(/\n/g, "<br />") : ''} }/>
            </dl>
          </Col>
        </Row>

      </div>
      </>
    )
  }

  render() {

    const {i18n} = this.props

    return (
      <PageTitle title={i18n.t('translation:page.title.nomination')}>
        <>
          {
            this.state.data
            ? this.renderItemDetails()
            : <LogoLoadingSpinner/>
          }
        </>
      </PageTitle>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses,
    countries: state.rootApp.countriesDictionary
  }
}

export default connect(mapStateToProps)(withTranslation('nominations')(NominationDetails))