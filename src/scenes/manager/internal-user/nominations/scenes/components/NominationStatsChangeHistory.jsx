import React, { useEffect, useState } from 'react'
import nominationService from '../../nominationService';
import Timeline from 'antd/lib/timeline'
import FormatDateString from 'src/_components/FormatDateString';
import {connect} from 'react-redux'
import {IoIosArrowDropup as IconIoIosArrowDropup} from 'react-icons/io'

const NominationStatsChangeHistory = (props) => {

  let [statusCollection, setStatusCollection] = useState(null)

  useEffect(() => {
    nominationService.getStatusHistory(props.nominationId)
    .then( res => {
      setStatusCollection(res.data)
    })
  }, [props.currentStatusId]);

  if (null === statusCollection) {
    return ''
  }

  return (
    <div className={props.className} style={props.style}>
      <Timeline className="mg-l-10 mg-t-20">
        {
          statusCollection.map( (rec, idx) => {
            return (
              <Timeline.Item /* color="green" */ key={idx} dot={<IconIoIosArrowDropup/>}>
                <div className="pull-left" style={{width: "70%"}}>
                  {props.nominationStatuses[rec.statusId].name}
                  <p dangerouslySetInnerHTML={{__html: rec.notes ? rec.notes.replace(/\n/g, "<br />") : ''}}/>
                  <small>{rec.createdByUser ? rec.createdByUser.fullName : ''}</small>
                </div>
                <div className="pull-right mg-r-10 text-right">
                  <small>{FormatDateString({text: rec.createdAt, ago: true, agoTooltip: true})} </small>
                </div>
                <div className="clearfix"/>
              </Timeline.Item>
            )
          } )
        }
      </Timeline>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses
  }
}


export default connect(mapStateToProps)(NominationStatsChangeHistory)