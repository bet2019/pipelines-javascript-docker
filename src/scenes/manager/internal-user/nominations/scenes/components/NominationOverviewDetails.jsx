import React from 'react'
import {connect} from 'react-redux'
import permissionAbility, { Can } from 'src/_helpers/permission';
import Card from 'antd/lib/card'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import FormatDateString from 'src/_components/FormatDateString';
import { nominationActions } from 'src/scenes/manager/internal-user/nominations/nominationDucks';
import HelpPixel, { helpTopics } from 'src/_components/helpPixel';
import NominationStatusElement from './NominationStatusElement';
import NominationStatsChangeHistory from './NominationStatsChangeHistory';
import NominationFollowupHistory from './NominationFollowupHistory';
import EngagementDetailsBlock from './EngagementDetailsBlock';
import NominationWorkflowSteps from './NominationWorkflowSteps';

const NominationOverviewDetails = (props) => {

  let item = props.nominationDataDetails

  function changeStatusAndReload(id, values = {}) {
    return props.dispatch(nominationActions.update(id, values))
    .then( res => props.fetchData())
  }

  return (
    <>
        <div className="mg-t-20 mg-b-40">
          <NominationWorkflowSteps 
            nominationId={item.uuid}
            nominationStatusId={item.statusId}
            nominationSubmittedAt={item.submittedAt}
          />
        </div>
        <Row gutter={8}>
          <Col span={14}>
            <div className="mg-b-10">
              <h3 className="text-strong">Project brief</h3>
            </div>            
            <div dangerouslySetInnerHTML={{__html: item.projectBrief ? item.projectBrief.replace(/\n/g, "<br />") : ''}}/>
          </Col>
          <Col span={10}>
            <div>
                <EngagementDetailsBlock 
                  nominationId={item.uuid}
                  nominationStatusId={item.statusId}
                  engagementExpectedDates={item.engagementExpectedDates || []}
                  engagementAssignedToUsers={item.engagementAssignedToUsers}
                  engagementProjectManagerUser={item.engagementProjectManagerUser}
                  engagementDatesConfirmed={item.engagementDatesConfirmed}
                  engagementSprintN={item.engagementSprintN}
                  writeup={item.writeup || null}
                  onUpdate={()=>props.fetchData()}
                />
            </div>
          </Col>
        </Row>

        <Row gutter={8} className="mg-t-20">
          <Col span={8}>
            <Card title="Company contact" size="small">
              <dl className="dl-horizontal dd-right">
                <dt className="external-user-access">Contact name</dt><dd>{item.contactPersonName}{item.contactPersonRole?` - ${item.contactPersonRole}`:''}</dd>
                <dt className="external-user-access">Contact email</dt><dd><a mailto={item.contactPersonEmail}>{item.contactPersonEmail}</a></dd>
                <dt className="external-user-access">Contact phone</dt><dd>{item.contactPersonPhone}</dd>
              </dl>
            </Card>
            
            {
              permissionAbility.can('do','acl:nominations/manage') 
              || permissionAbility.can('do','acl:nominations/view/followup_info')
              ? <Card size="small" title="Followup details" className="mg-t-10">
                  <NominationFollowupHistory
                    nominationId={item.uuid}
                    followAfter={item.followAfter}
                  />
                </Card>
              : ''
            }            

          </Col>
          <Col span={8}>
            <Card title="Microsoft contact" size="small">
              <dl className="dl-horizontal dd-right">
                <dt className="external-user-access">Name</dt>
                <dd>{item.microsoftContactName}</dd>

                <dt className="external-user-access">Email</dt>
                <dd><a mailto={item.microsoftContactEmail}>{item.microsoftContactEmail}</a></dd>                
              </dl>              
            </Card>            
          </Col>
          <Col span={8}>
            <Card size="small">
              <dl className="dl-horizontal dd-right">
                <dt className="external-user-access">Lab</dt><dd>{item.lab.name}</dd>

                {
                  permissionAbility.can('do','acl:nominations/manage') || permissionAbility.can('do','acl:nominations/view/source_info')
                  ? <>
                      <dt>Source</dt>
                      <dd>{item.source.name}</dd>
                    </>
                  : ''
                }
      
                <dt>Customer channel</dt>
                <dd> {item.customerChannel ? item.customerChannel.name : ''}</dd>
      
                <dt className="external-user-access">Industry vertical</dt><dd> {item.industryVertical ? item.industryVertical.name : ''}</dd>        
                <Can I="do" a="acl:lab_internal_info">
                  <dt>TPID</dt>
                  <dd>{item.msTpId}</dd>

                  <dt>Opportunity ID</dt>
                  <dd>{item.msOpportunityId}</dd>
                </Can>
                <dt>Submitted</dt><dd>{item.submittedAt ? FormatDateString({text: item.submittedAt}) : 'Not yet'}</dd>
                <dt>Status <HelpPixel topic={helpTopics.app.nominationStatusesDescr}/></dt>
                <dd> 
                  <NominationStatusElement 
                    nominationId={item.uuid}
                    statusId={item.statusId}
                    onChange={changeStatusAndReload}
                  /> 
                </dd>      
              </dl>
              
              {
                permissionAbility.can('do','acl:nominations/manage') || permissionAbility.can('do','acl:nominations/view/followup_info')
                ? <div className="scrollable-block-visible-scroll">
                    <NominationStatsChangeHistory 
                      style={{
                        maxHeight: "300px",
                        overflowY: "scroll",
                      }}
                      nominationId={item.uuid}
                      currentStatusId={item.statusId}
                    />
                  </div>
                : ''
              }
              
            </Card>
          </Col>          
        </Row>
    </>
  )
}

export default connect()(NominationOverviewDetails)