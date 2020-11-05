import React from 'react'
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import PropTypes from 'prop-types'
import {IoIosAddCircleOutline as IconIoIosAddCircleOutline} from 'react-icons/io'

export default function Create(props) {
  const {children, showIcon, ...rest} = props

  return (
    <Button 
      type='primary'
      {...rest}
    >
    {
      showIcon 
        ? <Icon component={IconIoIosAddCircleOutline}/>
        : ''

    }
      {children || 'Create'}
    </Button>
  )
}

Create.propTypes = {
  children: PropTypes.any.isRequired,
  showIcon: PropTypes.any
}

Create.defaultProps = {
  showIcon: true
}