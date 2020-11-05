import React from 'react'
import config from 'src/config';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

const FormatDateString = ({text, format, ago, agoTooltip}) => {
  if (ago) {
    if (agoTooltip) {
      return <Tooltip title={moment(text).format(format || config.dateTimeFormat) }>
              {moment(text).fromNow()}
             </Tooltip>
    } else {
      return moment(text).fromNow()
    }
  }
  return text ? moment(text).format(format || config.dateTimeFormat) : ''
}

export default FormatDateString