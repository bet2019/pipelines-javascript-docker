import React, { useState } from 'react'
import SprintNumberName from 'src/scenes/manager/internal-user/nominations/scenes/components/SprintNumberName';
import Routing, { routesUI } from 'src/_helpers/routing';
import {Link} from 'react-router-dom'
import permissionAbility, { Can } from 'src/_helpers/permission';
import DateRangeFormatter from '../DateRangeFormatter';
import config from 'src/config';
import ActionButtonsGroup from '../pageElements/ActionButtonsGroup';
import nominationService from 'src/scenes/manager/internal-user/nominations/nominationService';
import EngagementDetailsForm from './EngagementDetailsForm';
import Avatar from 'src/_components/user/Avatar';

const PopoverNominationCardContent = props => {
  
  let [isEngagementDatesEdit, setIsEngagementDatesEdit] = useState(false)
  let {data, nominationId} = props

  const onSubmit = values => {
    return nominationService.update(nominationId, values)
    .then(res=>{
      setIsEngagementDatesEdit(false)
      props.onSuccess()
    })
  }


    return (
      <Can I="do" a="acl:nominations/view/general_info" passThrough>
        {
          allowed => allowed ?
          <>
            <div>
              <b>{data.company.name} (<SprintNumberName number={data.engagementSprintN} questionReplace={true}/>)</b>
            </div>
            <div className="mg-b-20">
              <Link to={Routing.generate(routesUI.internalUser.nominations.view, {nominationId: props.nominationId})}>Nomination</Link>
              {
                data.writeup &&
                (permissionAbility.can('do', 'acl:nominations::writeups/manage') 
                || permissionAbility.can('do', 'acl:nominations::writeups/view'))
                ? <>
                &nbsp;|&nbsp;<Link to={Routing.generate(routesUI.internalUser.nominations.writeups.view, {
                  nominationId: props.nominationId,
                  writeupId: data.writeup.uuid
                })}>Writeup</Link>
                  </>
                : ''
              }
            </div>
            <div className="mg-b-20">



              <dl className="dl-horizontal dd-right dd-bold">
                <dt>Lab</dt>
                <dd>{data.lab.name}</dd>              
              {
                permissionAbility.can('do', 'acl:nominations/manage') && true === isEngagementDatesEdit
                ? (
                  <EngagementDetailsForm
                    onSubmit={onSubmit}
                    onClose={()=>{
                      setIsEngagementDatesEdit(false)
                    }}
                    initialValues={{
                      engagementSprintN: (data.engagementSprintN || data.engagementSprintN === 0) ? data.engagementSprintN.toString() : undefined,
                      engagementExpectedDates: data.engagementExpectedDates,
                      engagementAssignedToUsers: data.engagementAssignedToUsers.map(i=>i.uuid),
                      engagementProjectManager: data.engagementProjectManagerUser ? data.engagementProjectManagerUser.uuid : null,
                      engagementDatesConfirmed: data.engagementDatesConfirmed
                    }}
                  />
                  )
                : <>
                  <dt>Engagement dates</dt>
                  <dd>
                    {
                      data.writeup || data.engagementExpectedDates
                      ? (<>
                          <DateRangeFormatter
                            date1={data.writeup ? data.writeup.engagementDates[0] : data.engagementExpectedDates[0]}
                            date2={data.writeup ? data.writeup.engagementDates[1] : data.engagementExpectedDates[1]}
                            format={config.dateFormatMMMDYYYY}
                          />
                          {
                            !data.writeup && permissionAbility.can('do', 'acl:nominations/manage') && false === isEngagementDatesEdit
                            ? <ActionButtonsGroup
                            className="mg-l-10" 
                                itemId={nominationId}
                                onEdit={()=>{
                                  setIsEngagementDatesEdit(true)
                                }}
                              />
                            : ''
                          }
                        </>)
                      : 'N/A'
                    }
                  </dd>
                  <>
                    <dt>Dates confirmed</dt>
                    <dd>{data.engagementDatesConfirmed ? "Yes" : "No"}</dd>
                  </>
                  {
                    permissionAbility.can('do', 'acl:nominations/manage')
                    ? <>
                      <dt>Assigned engineers</dt>
                        <dd>
                        {
                          data.engagementAssignedToUsers.reverse().map(i => {
                            let {uuid, fullName, email} = i
                            return (
                              <Avatar
                                className="pull-right mg-r-3"
                                key={uuid}
                                size="1.3rem"
                                user={{
                                  uuid,
                                  fullName,
                                  email
                                }}
                              />
                            )
                          })
                        }
                        </dd>
                      </>
                    : ''
                  }

                  {
                    permissionAbility.can('do', 'acl:nominations/manage')
                    ? <>
                      <dt>Assigned PM</dt>
                        <dd>
                        {
                          data.engagementProjectManagerUser
                          ? <Avatar
                              key={data.engagementProjectManagerUser.uuid}
                              className="pull-right mg-r-3"
                              size="1.3rem"
                              user={{
                                uuid: data.engagementProjectManagerUser.uuid,
                                fullName: data.engagementProjectManagerUser.fullName,
                                email: data.engagementProjectManagerUser.email
                              }}
                            />
                          : ''
                        }
                        </dd>
                      </>
                    : ''
                  }
                  </>
              }


              
            
            </dl>
            </div>

            <div>
              <b>Project brief: </b>
              <div 
                style={{
                  maxHeight: '15em',
                  overflow: "auto"
                }}
                dangerouslySetInnerHTML={{ __html: data.projectBrief ? data.projectBrief.replace(/\n/g, "<br />") : 'N/A'} }
              />
            </div>
          </>
          : 'No Access'
        }
      </Can>
    )
   
}

export default PopoverNominationCardContent