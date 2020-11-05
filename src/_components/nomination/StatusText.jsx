import React, { useContext } from 'react'
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';
import {connect} from 'react-redux'

const StatusText = (props) => {
  let {nominationStatusColorMap} = useContext(GlobalSettingsContext)
  let color = [
    props.nominationStatuses.new.id,
    props.nominationStatuses.open.id,
    props.nominationStatuses.on_hold.id
    ].indexOf(props.statusId)>-1
  ? nominationStatusColorMap[props.statusId] || '#000'
  : '#000'
  let fontWeight = (props.bold !== undefined && Boolean(props.bold) === false) ? 'initial' : 750

  return (
    <span style={{color, fontWeight}}>{props.children}</span>
  )
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses
  }
}

export default connect(mapStateToProps)(StatusText)