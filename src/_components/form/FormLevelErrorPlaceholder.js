import React from 'react'
import PropTypes from 'prop-types'

const FormLevelErrorPlaceholder = props => {
  return (
      props.show && true === props.show 
      ? <div className="text-center app-error"> {props.message || 'Data was not submitted, see the notes above'} </div>
      : ''
  )
}

FormLevelErrorPlaceholder.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.any
}

export default FormLevelErrorPlaceholder