import React from 'react'

const ExternalLink = props => {
  let {url, noArrowIcon, ...rest} = props
  url = 'http://'+url.replace(/^https?:\/\//,'')
  return (
    <>
      <a href={url} target="_blank" rel="nofollow" {...rest}>{props.children} {!noArrowIcon ? <small>&#x2924;</small> : '' }</a> 
    </>
  )
}

export default ExternalLink