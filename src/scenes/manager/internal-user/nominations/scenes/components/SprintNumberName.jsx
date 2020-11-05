import React from 'react'

const SprintNumberName = props => {
  return (
    props.number || props.number===0  
    ? `Sprint ${props.number}` 
    : (props.questionReplace && true === props.questionReplace) 
      ? <span>Sprint&nbsp;<span className="text-danger">???</span> </span> 
      : ''
  )
}

export default SprintNumberName