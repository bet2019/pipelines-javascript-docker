import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import { nominationActions } from 'src/scenes/manager/internal-user/nominations/nominationDucks';
import {connect} from 'react-redux'
import config from 'src/config';
import DateRangeFormatter from 'src/_components/DateRangeFormatter';
import Button from 'antd/lib/button';
import {IoIosAddCircleOutline as IconIoIosAddCircleOutline} from 'react-icons/io'
import Icon from 'antd/lib/icon'
import permissionAbility, { Can } from 'src/_helpers/permission';
import {Link} from 'react-router-dom'
import Routing, { routesUI } from 'src/_helpers/routing';
import FormatDateString from 'src/_components/FormatDateString';
import EngagementDetailsForm from 'src/_components/nomination/EngagementDetailsForm';
import Avatar from 'src/_components/user/Avatar';

const EngagementDetailsBlock = (props) => {

  let [isEdit, setIsEdit] = useState(false)

  function formOnSubmit(values) {
    if (values.engagementExpectedDates && values.engagementExpectedDates.length === 0) {
      values.engagementExpectedDates = null
    }
    props.dispatch(nominationActions.update(props.nominationId, values))
    .then(()=>{
      props.onUpdate()
      setIsEdit(false)
    })
  }

  function formOnClose() {
    setIsEdit(false)
  }

  function renderContent() {
    return (
      <>
          <dl className="dl-horizontal dd-right dd-bold">
            <dt>Sprint Number</dt>
            <dd>{props.engagementSprintN || props.engagementSprintN===0  ? `Sprint ${props.engagementSprintN}` : ''}</dd>

            {
              props.writeup && props.writeup.engagementDates && props.writeup.engagementDates.length == 2
              ? <>
                  <dt>Engagement dates</dt>
                  <dd>
                    <DateRangeFormatter 
                      date1={props.writeup.engagementDates[0]}
                      date2={props.writeup.engagementDates[1]}
                      format={config.dateFormatMMMDYYYY}
                    />
                  </dd>
                </>
              : <>
                  <dt>Planned dates</dt>
                  <dd>
                    {
                      props.engagementExpectedDates.length === 2
                      ? <DateRangeFormatter 
                          date1={props.engagementExpectedDates[0]}
                          date2={props.engagementExpectedDates[1]}
                          format={config.dateFormatMMMDYYYY}
                        />
                      : ''
                    }
                  </dd>
                  
                  <dt>Dates confirmed</dt>
                  <dd>{props.engagementDatesConfirmed ? "Yes" : "No"}</dd>
                </>
            }            


          {
            permissionAbility.can('do', 'acl:nominations/manage')
            ? <>
              <dt>Assigned engineers</dt>
                <dd>
                {
                  props.engagementAssignedToUsers.reverse().map(i=>{
                    let {uuid, fullName, email} = i
                    return (
                      <Avatar
                        key={uuid}
                        className="pull-right mg-r-3"
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
                  props.engagementProjectManagerUser
                  ? <Avatar
                      key={props.engagementProjectManagerUser.uuid}
                      className="pull-right mg-r-3"
                      size="1.3rem"
                      user={{
                        uuid: props.engagementProjectManagerUser.uuid,
                        fullName: props.engagementProjectManagerUser.fullName,
                        email: props.engagementProjectManagerUser.email
                      }}
                    />
                  : ''
                }
                </dd>
              </>
            : ''
          }         
          </dl>   
      </>
    )
  }

  return (
    <div>
        <div className="mg-b-10">
          <div className="pull-left">
            <h3 className="text-strong">Engagement details</h3>
          </div>
          <div className="pull-right mg-t-5">
            {
              permissionAbility.can('do', 'acl:nominations/manage') && false === isEdit
              ? <ActionButtonsGroup
                  itemId={props.nominationId}
                  onEdit={()=>{
                    setIsEdit(true)
                  }}
                />
              : ''
            }
          </div>
          <div className="clearfix"/>
        </div>
        <div>     
          {
            permissionAbility.can('do', 'acl:nominations/manage') && true === isEdit
            ? <EngagementDetailsForm 
                onSubmit={formOnSubmit}
                onClose={formOnClose}
                initialValues={{
                  engagementSprintN: (props.engagementSprintN || props.engagementSprintN === 0) ? props.engagementSprintN.toString() : undefined,
                  engagementExpectedDates: props.engagementExpectedDates,
                  engagementAssignedToUsers: props.engagementAssignedToUsers.map(i=>i.uuid),
                  engagementProjectManager: props.engagementProjectManagerUser ? props.engagementProjectManagerUser.uuid : null,
                  engagementDatesConfirmed: props.engagementDatesConfirmed
                }}
              />
            : renderContent()
          }
        </div>
        
         <div className="text-center mg-t-10">
          {
            props.writeup
            ? (
              permissionAbility.can('do', 'acl:nominations::writeups/manage') 
              || permissionAbility.can('do', 'acl:nominations::writeups/view')
              ?
                <Link to={Routing.generate(routesUI.internalUser.nominations.writeups.view, {
                  nominationId: props.nominationId,
                  writeupId: props.writeup.uuid
                })} >
                  Writeup from <FormatDateString text={props.writeup.createdAt}/>
                </Link>
              : ''
            )
            : (
              permissionAbility.can('do', 'acl:nominations::writeups/manage') 
              ? <Button type="primary">
                  <Link to={Routing.generate(routesUI.internalUser.nominations.writeups.create, {nominationId: props.nominationId})}>
                    <Icon component={IconIoIosAddCircleOutline}/> Make a writeup
                  </Link>
                </Button>
              : ''
            )                
          }                  
        </div>
    </div>
  )
}

EngagementDetailsBlock.defaultProps = {
  engagementAssignedToUsers: []
}
EngagementDetailsBlock.propTypes = {
  nominationId: PropTypes.any.isRequired,
  nominationStatusId: PropTypes.any.isRequired,
  engagementExpectedDates: PropTypes.array.isRequired,
  engagementProjectManagerUser: PropTypes.any,
  engagementDatesConfirmed: PropTypes.any,
  engagementSprintN: PropTypes.any,
  writeup: PropTypes.any,
}

export default connect()(EngagementDetailsBlock)