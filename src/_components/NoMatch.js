import React  from "react";
import Col    from 'antd/lib/col'
import Row    from 'antd/lib/row'

export default class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <h1>404</h1>
            <div>
              Requested page was not found or not exists
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
