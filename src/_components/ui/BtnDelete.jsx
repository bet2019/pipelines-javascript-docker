import React from 'react'
import Popconfirm from 'antd/lib/popconfirm';

export default class BtnDelete extends React.Component {
  render() {
    let props = this.props
    return (
      <Popconfirm
        title={props.title || "Are you sure delete this?"}
        onConfirm={props.onConfirm || alert('onConfirm should be defined') }
        onCancel={props.onCancel || null}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">{props.children || "Delete"}</a>
      </Popconfirm>
    )
  }
}