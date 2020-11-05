import React from 'react'

const MsftProductItem = (props) => {

  return (
    <>
      {
        props.data.icon
        ? <img src={props.data.icon} width="22px"/>
        : <span style={{paddingRight:'22px'}}></span>
      }
        <span className="mg-l-10">
          {
            props.showDocUrl && props.data.officialUrl
            ? <a href={props.data.officialUrl} target="_blank">{props.data.name}</a>
            : props.data.name
          }          
        </span>
    </>
  )
}
export default MsftProductItem