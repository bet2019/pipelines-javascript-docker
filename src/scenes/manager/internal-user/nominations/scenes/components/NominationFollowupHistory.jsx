import React, { useState, useEffect } from 'react'
import {IoIosAddCircleOutline as IconIoIosAddCircleOutline} from 'react-icons/io'
import Icon from 'antd/lib/icon'
import PropTypes from 'prop-types'
import NominationFollowupNewEditForm, { NOMINATION_FOLLOWUP_FORM_ID } from './NominationFollowupNewEditForm';
import nominationService from '../../nominationService';
import permissionAbility, { Can } from 'src/_helpers/permission';
import {connect} from 'react-redux'
import {reset as resetForm} from 'redux-form'
import Timeline from 'antd/lib/timeline'
import FormatDateString from 'src/_components/FormatDateString';
import config from 'src/config';
import moment from 'moment';
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import {AiFillPushpin as IconAiFillPushpin, AiOutlinePushpin as IconAiOutlinePushpin} from 'react-icons/ai'
import FormDatePickerField from 'src/_components/form/FormDatePicker';
import { Divider } from 'antd';


const NominationFollowupHistory = props => {

  let [editing, setEditing] = useState({
    isEditing: false,
    isEditingId: null
  })
  let [followupCollection, setFollowupCollection] = useState([])

  let [followAfter, setFollowAfter] = useState(props.followAfter)
  useEffect(()=>{
    fetchData()
  }, [])

  function fetchData() {
    return nominationService.cgetFollowupRecord(props.nominationId)
      .then(res => {
        setFollowupCollection(res.data)
      })
  }

  async function toggleIsEditingState(toggleValue, toggleId) {
    if (toggleValue === undefined) {
      toggleValue = !isEditing;
    }
    if (toggleId === undefined) {
      toggleId = null;
    }
    
    await setEditing({
      isEditing: false,
      isEditingId: null
    })
    await setEditing({
      isEditing: toggleValue,
      isEditingId: toggleId
    })
  }

  function createFollowupRecord(values) {
    return nominationService.createFollowupRecord(props.nominationId, values)
      .then( res => {
        return fetchData().then( () => {
          toggleIsEditingState(false)
          return props.dispatch(resetForm(NOMINATION_FOLLOWUP_FORM_ID))
        })
      })
  }

  function saveFollowupRecord(followupId, values) {
    return nominationService.updateFollowupRecord(props.nominationId, followupId, values)
      .then( res => {
        return fetchData().then( () => {
          toggleIsEditingState(false)
          return props.dispatch(resetForm(NOMINATION_FOLLOWUP_FORM_ID))
        })
      })
  }

  function deleteFollowupRecord(followupId) {
    return nominationService.removeFollowupRecord(props.nominationId, followupId)
      .then( res => {
        return fetchData()
      })
  }

  function pinToggleFollowup(rec) {
    return saveFollowupRecord(rec.uuid, {
      notes: rec.notes,
      pinned: !Boolean(rec.pinnedAt)
    })
  }

  function constructExtraElement(rec) {
    let element = {}    
    element.component = <a 
      className="text-muted" 
      style={rec.pinnedAt !== null ? { color: 'orange' } : {}} 
      onClick={() => pinToggleFollowup(rec)}
    >
      {
        rec.pinnedAt !== null ? <IconAiFillPushpin /> : <IconAiOutlinePushpin />
      }
    </a>

    return [element]
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function selectFollowAfterDate(followAfter) {
      nominationService.update(props.nominationId, { followAfter: followAfter===''?null: followAfter})
        .then(res => {
          nominationService.get(props.nominationId)
          .then(res2 =>{
            setFollowAfter(res2.data.followAfter)
          })
        })
  }

  function renderRecord(rec,props={}) {
    return <div key={rec.uuid} className={props.className}>
      {
        editing.isEditing && editing.isEditingId === rec.uuid && permissionAbility.can('do', 'acl:nominations/manage')
      ? <NominationFollowupNewEditForm
        className="p-t-10"
        onSubmit={(values) => saveFollowupRecord(rec.uuid, {...values, pinned: Boolean(rec.pinnedAt)})}
        onClose={() => toggleIsEditingState(false)}
        initialValues={{
          notes: rec.notes
        }}
      />
      : <>
        <div className="pull-left" style={{ width: "70%" }}>
          <p dangerouslySetInnerHTML={{ __html: rec.notes.replace(/\n/g, "<br />") }} />
          <small>{rec.createdByUser.fullName}</small>
        </div>
        <div className="pull-right mg-r-10 text-right">
          <small>{FormatDateString({ text: rec.createdAt, ago: true, agoTooltip: true })} </small>
          {
            Math.abs(moment(rec.createdAt).unix() - moment().unix()) <= config.followupRecordModifyDelay
              && permissionAbility.can('do', 'acl:nominations/manage')
              ?
              <div>
                <ActionButtonsGroup
                  itemId={rec.uuid}
                  onEdit={() => toggleIsEditingState(true, rec.uuid)}
                  onDelete={() => deleteFollowupRecord(rec.uuid)}
                  extraElements={constructExtraElement(rec)}
                />
              </div>
              :
              <div>
                <ActionButtonsGroup
                  itemId={rec.uuid}
                  extraElements={constructExtraElement(rec)}
                />
              </div>
          }
        </div>
        <div className="clearfix" />
        </>
      }
      </div>
  }

  return (
    <div className="scrollable-block-visible-scroll">

      <Can I="do" a="acl:nominations/manage">
        {
          <div>
            <dl className="dl-horizontal dd-right">
              <dt className="form-group">Follow up after</dt>
              <dd><FormDatePickerField
                input={{ onChange: selectFollowAfterDate }}
                value={followAfter === null ? null : moment(followAfter)}
                disabledDate={disabledDate} /></dd>
            </dl>
            <Divider className="mg-t-10 mg-b-10" />
          </div>
        }
        {
          editing.isEditing && editing.isEditingId === null
            ? <NominationFollowupNewEditForm
              onSubmit={createFollowupRecord}
              onClose={() => toggleIsEditingState(false)}
            />
            : <div className="text-center">
              <a key={`add-new`} onClick={() => toggleIsEditingState(true)}>
                <Icon component={IconIoIosAddCircleOutline} /> Add a record
                </a>
            </div>
        }
      </Can>

      {
        followupCollection.filter(item => item.pinnedAt !== null).map((rec, idx) => {
          return renderRecord(rec, { className: 'mg-b-20 followup-record pinned' })
        })
      }
      <div
        className="mg-t-10"
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
        }}>
        <Timeline>
          {
            followupCollection.filter(item => item.pinnedAt === null).map((rec, idx) => {
              return (
                <Timeline.Item key={idx}>
                  {renderRecord(rec)}
                </Timeline.Item >
              )
            })
          }
        </Timeline>
      </div>
      
    </div>
  )
}

NominationFollowupHistory.propTypes = {
  nominationId: PropTypes.any.isRequired
}

export default connect()(NominationFollowupHistory)