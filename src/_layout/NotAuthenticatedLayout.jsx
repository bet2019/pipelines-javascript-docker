// @flow

import React                from "react";
import Row                  from "antd/lib/row";
import Card                 from "antd/lib/card";
import FlashBag             from "src/_layout/components/FlashBag";
import PageFooter           from "src/_layout/components/PageFooter";


class NotAuthenticatedLayout extends React.Component {
  render() {

    let {component: Component, ...rest} = this.props

    return (
      <>
        <div>
          <Row type={"flex"} justify={"center"}>
            <Card bordered={false}>
              <FlashBag/>
              <Component {...rest}/>
            </Card>
          </Row>
        </div>
        <div>
          <PageFooter/>
        </div>
      </>
    );
  }
}

export default NotAuthenticatedLayout;
