import React from 'react';
import TableDataHandler from 'src/_mixin/TableDataHandler';
import Routing from 'src/_helpers/routing';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class LabsList extends TableDataHandler(React.Component) {

  constructor(props) {
    super(props)

    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        // render: (text, record, index) => {record.name}
      }
    ]
  }

  getHandleTableDataUrl() {
    return Routing.generate('routes.api.internal.labs.cget')
  }

  render() {
    return (
      <Can I="do" a="acl:labs/manage">
        <PageTitle title="Labs">
          <div className="mg-t-10">
            {this.renderTable(this.columns)}
          </div>
        </PageTitle>
      </Can>
    )
  }
}

export default LabsList