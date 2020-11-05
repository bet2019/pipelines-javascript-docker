import React    from 'react'
import Row      from 'antd/lib/row'
import Col      from 'antd/lib/col'

class DefaultLayout extends React.Component {

  render() {
    const {component:Component, ...rest} = this.props

    return (
      <Row>
        <Col span={22} offset={1}>
          <Component {...rest}/>
        </Col>
      </Row>
    )
  }
}

export default DefaultLayout;
