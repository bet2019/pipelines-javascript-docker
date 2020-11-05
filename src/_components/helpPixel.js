import React      from 'react'
import Popover    from 'antd/lib/popover'
import Alert      from 'antd/lib/alert'
import Icon       from 'antd/lib/icon'
import PropTypes  from 'prop-types'
import {IoIosHelpCircleOutline } from 'react-icons/io'

export const helpTopics = {
  app: {
    nominationStatusesDescr: `
    <b>New</b> - A new nomination have been received <br/>
    <b>Open</b> - Nomination accepted and is in progress <br/>
    <b>Closed</b> - Nomination was closed because the customer cancelled <br/>
    <b>Rejected</b> - Nomination rejected because nomination did not meet Lab criteria <br/>
    <b>On Hold</b> - The project has been on hold due to an unavailable dependency (technology release), customer factor (funding), etc <br/>
    <b>Completed</b> - Customer have gone through Lab process and completed their sprint
    `,
    nominationsTotalBySourceChartExcludedStatuses: `
      Nominations with <b>Draft</b> and <b>Deleted</b> status are excluded
    `
  }
}

const HelpPixel = (props) => {
  let position = props.position || 'popover'
  let icon = undefined === props.icon ? IoIosHelpCircleOutline : props.icon

  if (position === 'append') {
    return (
      <Alert
        type="none"
        showIcon={!!icon}
        icon={icon?<Icon component={icon} />:false}
        message={props.topic.constructor.name === 'string' ? <div dangerouslySetInnerHTML={{__html:props.topic || false}}/> : props.topic}
      />
    )
  }

  return (
    <Popover content={<div dangerouslySetInnerHTML={{__html:props.topic || false}}/>}
    overlayStyle={{
      maxWidth: "300px"
    }}
    >
      {icon ? <Icon component={icon} /> : ''}
    </Popover>
  )
}

HelpPixel.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element,PropTypes.bool])
}

export default HelpPixel
