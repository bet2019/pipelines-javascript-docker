import React from 'react'
import PropTypes from 'prop-types'
import FormatDateString from './FormatDateString';

const DateRangeFormatter = props => {
  return (
    <>
      <FormatDateString text={props.date1} format={props.format || undefined}/> 
      &nbsp;-&nbsp;
      <FormatDateString text={props.date2} format={props.format || undefined}/>
    </>
  )
}

DateRangeFormatter.propTypes = {
  date1: PropTypes.any.isRequired,
  date2: PropTypes.any.isRequired,
  format: PropTypes.any
}

export default DateRangeFormatter