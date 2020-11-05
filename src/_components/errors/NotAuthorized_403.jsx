import React from 'react'
import PropTypes from 'prop-types'

const NotAuthorized_403 = props => {
  return (
    <div className="text-center mg-t-40">
      <h3>{props.errorMessage || 'Not Authorized to access the resource'}</h3>
      {
        props.errorSubMessage
        ? <p>{props.errorSubMessage}</p>
        : ''
      }
    </div>
  )
}
NotAuthorized_403.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorSubMessage: PropTypes.string
}


export default NotAuthorized_403