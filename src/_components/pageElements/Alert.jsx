import React from 'react'
import PropTypes from 'prop-types'

const Alert = props => {
  return (
    <div className={`alert ${props.type} ${props.className}`}>
      {
        props.closeIcon && props.closeIcon===true
        ? <span class="closebtn">&times;</span>  
        : ''
      }
      {props.children}
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  className: PropTypes.string,
  closeIcon: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
}

export default Alert