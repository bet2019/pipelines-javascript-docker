import React from 'react'
import Tooltip from 'antd/lib/tooltip';

const Avatar = props => {

  let initials = ''
  if (props.user && props.user.fullName && props.user.fullName.length > 0) {
    let arr = props.user.fullName.replace(/\s+/, ' ').split(' ')    
    initials = arr[0][0].toUpperCase()+(arr[1] ? arr[1][0].toUpperCase() : '')
  }

  return (
    <div className={`user-avatar ${props.className}`}>
      <Tooltip title={<small>{props.user.fullName}<br/>({props.user.email})</small>}>
      <div className="circle" style={{
        height: props.size || '1rem',
        width: props.size || '1rem'
      }}>
        <span className="initials">{initials}</span>
      </div>
      </Tooltip>
    </div>
  )
}

export default Avatar