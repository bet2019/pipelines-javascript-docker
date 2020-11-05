import React from 'react'
import ReactDOM from 'react-dom'

export default class Frame extends React.Component {
  componentDidMount() {
    this.iframeHead = this.node.contentDocument.head
    this.iframeRoot = this.node.contentDocument.body
    this.ifWindow = this.node.contentDocument.window
    this.ifDocument = this.node.contentDocument.document
    console.warn(this.node, this.node.contentDocument, this.iframeHead, this.iframeRoot, this.ifWindow, this.ifDocument)
    this.forceUpdate()
  }

  render() {
    const { children, head, onLoad, ...rest } = this.props
    return (
      <iframe {...rest} ref={node => (this.node = node)} onLoad={()=>onLoad(this.ifWindow,this.ifDocument)}>
        {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
        {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
      </iframe>
    )
  }
}