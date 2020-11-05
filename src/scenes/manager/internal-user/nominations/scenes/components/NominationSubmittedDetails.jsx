import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card'
import FormatDateString from 'src/_components/FormatDateString';
import permissionAbility, { Can } from 'src/_helpers/permission';

class NominationSubmittedDetails extends React.Component {

  render() {
    let item = this.props.item
    
    return (
    <>
        <Row gutter={16} className="mg-t-20">
          <Col span={12}>
            <Card size="small">
              <dl className="dl-vertical-with-padding">
                <dt className="external-user-access">Number of engineers team will bring to lab:</dt><dd>{item.numOfEngineers}</dd>

                {/* {
                  permissionAbility.can('do', 'acl:nominations/manage') || permissionAbility.can('do', 'acl:nominations/view/general_info/extra_details') 
                  ? <> */}
                      <dt className="external-user-access">Projected # of devices or products:</dt><dd>{item.projectedNumDevices}</dd>
                      <dt>Projected revenue consumption:</dt><dd>{item.projectedDollarConsumptions}</dd>
                    {/* </>
                  : ''
                } */}
                
                <dt className="external-user-access">Project phase:</dt>
                <dd dangerouslySetInnerHTML={{ __html: item.projectPhase ? item.projectPhase.replace(/\n/g, "<br />") : ''} }/>
              </dl>
            </Card>
          </Col>
          {/* {
            permissionAbility.can('do', 'acl:nominations/manage') || permissionAbility.can('do', 'acl:nominations/view/general_info/extra_details') 
            ?  */}
            <Col span={12}>
                <Card size="small">
                  <dl className="dl-vertical-with-padding">
                    <dt className="external-user-access">Projected Microsoft Azure Consumption (lifetime of project) ($ USD):</dt><dd>{item.azureCloudConsumptionLifetime}</dd>
                    <dt className="external-user-access">Projected Microsoft Azure Consumption (a year) ($ USD):</dt><dd>{item.azureCloudConsumption}</dd>

                    <Can I="do" a="acl:lab_internal_info">
                      <dt className="external-user-access">Azure subscription GUID:</dt><dd>{item.azureSubscriptionGuid}</dd>                
                    </Can>
                  </dl>              
                </Card>          
              </Col>
            {/* : ''
          } */}
          
        </Row>

        <Row gutter={16} className="mg-t-20">
          <Col span={12}>
            <h2>Marketing/Business Plan</h2>
            <dl className="dl-vertical-with-padding">
              <dt className="external-user-access">Described AI and/or IoT product:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.iotOpportunity ? item.iotOpportunity.replace(/\n/g, "<br />") : ''} }/>
              <dt className="external-user-access">Current status of AI or IoT product as of today:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.currentStatusDesc ? item.currentStatusDesc.replace(/\n/g, "<br />") : ''} }/>
              <dt className="external-user-access">Target market and customer benefit:</dt>
              <dd dangerouslySetInnerHTML={{ __html: item.marketOpportunity ? item.marketOpportunity.replace(/\n/g, "<br />") : ''} }/>
              {/* {
                  permissionAbility.can('do', 'acl:nominations/manage') || permissionAbility.can('do', 'acl:nominations/view/general_info/extra_details') 
                  ? <> */}
                      <dt className="external-user-access">Product phases and target dates for each launch:</dt>
                      <dd dangerouslySetInnerHTML={{ __html: item.productPhasesDesc ? item.productPhasesDesc.replace(/\n/g, "<br />") : ''} }/>
                      <dt className="external-user-access">Projected annual revenue for product/service:</dt><dd>{item.projectedAnnualRevenue}</dd>
                      <dt className="external-user-access">Projected number of products sold annually:</dt><dd>{item.projectedSoldAnnually}</dd>
                      <dt>Target benefits:</dt>
                      <dd dangerouslySetInnerHTML={{ __html: item.totalBenefits ? item.totalBenefits.replace(/\n/g, "<br />") : ''} }/>
                    {/* </>
                  : ''
              } */}
            </dl>
          </Col>
          {/* {
            permissionAbility.can('do', 'acl:nominations/manage') || permissionAbility.can('do', 'acl:nominations/view/general_info/extra_details') 
            ? */}
              <Col span={12}>
                <h2>Technical Overview and Objectives for Lab Visit</h2>
                <dl className="dl-vertical-with-padding">
                  <dt className="external-user-access">Technical Overview of AI or IoT Design:</dt>
                  <dd dangerouslySetInnerHTML={{ __html: item.iotDesign ? item.iotDesign.replace(/\n/g, "<br />") : ''} }/>
                  <dt className="external-user-access">Microsoft Technologies used in this project:</dt>
                  <dd dangerouslySetInnerHTML={{ __html: item.microsoftTechnologies ? item.microsoftTechnologies.replace(/\n/g, "<br />") : ''} }/>
                  <dt className="external-user-access">Prioritized the workstreams and details for each workstream to work on in the lab :</dt>
                  <dd dangerouslySetInnerHTML={{ __html: item.prioritizedWorkStreamDesc ? item.prioritizedWorkStreamDesc.replace(/\n/g, "<br />") : ''} }/>
                  <dt className="external-user-access">Cloud Technologies:</dt>
                  <dd dangerouslySetInnerHTML={{ __html: item.iotCloudTechnologies ? item.iotCloudTechnologies.replace(/\n/g, "<br />") : ''} }/>
                  <dt>IoT technologies:</dt>
                  <dd dangerouslySetInnerHTML={{ __html: item.iotTechnologies ? item.iotTechnologies.replace(/\n/g, "<br />") : ''} }/>
                </dl>
              </Col>        
            {/* : ''
          } */}
        </Row>

        <Can I="do" a="acl:nominations/manage"> 
          <div className="mg-t-20">
            <ul className="list-unstyled text-small-09">
              <li>Created by {item.createdByUser ? item.createdByUser.fullName : ''}({item.createdByUser ? item.createdByUser.email : ''}) at {FormatDateString({text: item.createdAt})}</li>
              <li>Updated by {item.updatedByUser ? item.updatedByUser.fullName : ''}({item.updatedByUser ? item.updatedByUser.email : ''}) at {FormatDateString({text: item.updatedAt})}</li>
            </ul>
          </div>
        </Can>
    </>
    )
  }
}


export default connect()(NominationSubmittedDetails)