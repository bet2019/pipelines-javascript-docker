import React from 'react'
import {connect} from 'react-redux'
import Tabs from 'antd/lib/tabs'
import Table from 'antd/lib/table'
import {Link} from 'react-router-dom'
import Routing, { routesUI } from 'src/_helpers/routing';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import MsftProductItem from 'src/_components/MsftProductItem';
import SprintNumberName from '../../nominations/scenes/components/SprintNumberName';
import DateRangeFormatter from 'src/_components/DateRangeFormatter';
import config from 'src/config';
import permissionAbility from 'src/_helpers/permission';


class LabSubmittedCompletedNominationsTable extends React.Component {

  render() {
    return (

      <Tabs className="mg-t-20">
      {
        Object.values(this.props.completedEngagements).map( (lab, idx) => {
          
          return (
            <Tabs.TabPane tab={lab.name} key={`lab-${lab.id}`}>

              <Table 
                rowKey={record => record.writeupId}
                dataSource={lab.data}
                pagination={false}
                defaultExpandAllRows={true}
                expandedRowRender={(record, index, indent, expanded)=>{
                  return (
                    <Row gutter={25} key={`lab-${lab.id}-extended-row-${record.writeupId}`}>
                      <Col span={8}>
                        <div><strong>Project Brief:</strong></div>
                        <div dangerouslySetInnerHTML={{ __html: record.projectBrief ? record.projectBrief.replace(/\n/g, "<br />") : ''}} />
                      </Col>
                      <Col span={8}>
                        <div><strong>Engagement summary:</strong></div>
                        <div dangerouslySetInnerHTML={{ __html: record.outcome ? record.outcome.replace(/\n/g, "<br />") : ''}} />
                      </Col>
                      <Col span={8}>
                        <div className="mg-b-20"><strong>Products in project</strong></div>
                        {
                          Object.keys(record.productsByCategories).map( (categoryId, catIdx) => {
                            return (
                              <div className="mg-l-20" key={`lab-${lab.id}-extended-row-${record.writeupId}-category-${catIdx}`}>
                                <div><strong>{record.productsByCategories[categoryId].name}</strong></div>
                                {
                                  record.productsByCategories[categoryId].products.map( (productItem, prodIdx) => {
                                    return (
                                      <div className="mg-l-20" key={`lab-${lab.id}-extended-row-${record.writeupId}-category-${catIdx}-product-${productItem.id}-${prodIdx}`}>
                                        <MsftProductItem
                                          // showDocUrl={true}
                                          data={this.props.msftProducts[productItem.id]}
                                        />
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            )
                          })
                        }
                      </Col>
                    </Row>
                  )
                }}
                columns={[
                  {
                    title: 'Company',
                    dataIndex: 'companyName',
                    key: 'companyName',
                    verticalAlign: 'top',
                    render: (text, record, idx) => {
                      return (
                        <>
                          <div className="mg-b-20">
                            <h2><strong>{record.companyName} (<SprintNumberName number={record.engagementSprintN} questionReplace={true}/>)</strong></h2>
                          </div>
                          <div>
                            Engagement dates:&nbsp;
                            <span className="text-strong">
                              <DateRangeFormatter 
                                date1={record.engagementDates[0]}
                                date2={record.engagementDates[1]}
                                format={config.dateFormatMMMDYYYY}
                              />
                            </span>
                          </div>
                          <div className="menu-actions-horizontal-list">
                              {
                                permissionAbility.can('do', 'acl:nominations/manage')
                                || permissionAbility.can('do', 'acl:nominations/view/general_info')
                                ? <Link to={Routing.generate(routesUI.internalUser.nominations.view, {
                                    nominationId: record.nominationId,
                                  })}>
                                    Nomination
                                  </Link>
                                : ''
                              }
                              
                              {
                                permissionAbility.can('do', 'acl:nominations::writeups/manage')
                                || permissionAbility.can('do', 'acl:nominations::writeups/view')
                                ? <Link to={Routing.generate(routesUI.internalUser.nominations.writeups.view, {
                                      nominationId: record.nominationId,
                                      writeupId: record.writeupId,
                                    })}>
                                    Writeup
                                  </Link>
                                : ''
                              }
                          </div>
                        </>
                      )
                    }
                  },
                  {
                    title: 'Finished at',
                    dataIndex: 'engagementFinishMonth',
                    key: 'engagementFinishMonth',                    
                  },
                  {
                    title: 'Source',
                    dataIndex: 'sourceName',
                    key: 'sourceName'
                  },
                  {
                    title: 'Industry vertical',
                    dataIndex: 'industryVerticalName',
                    key: 'industryVerticalName'
                  },
                  {
                    title: 'Customer Channel',
                    dataIndex: 'customerChannelName',
                    key: 'customerChannelName'
                  },
                  // {
                  //   title: 'Summary',
                  //   dataIndex: 'outcome',
                  //   key: 'outcome',
                  //   width: "30%"
                  // },
                ]}
              />
            </Tabs.TabPane>
          )
        })
      }
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    msftProducts: state.rootApp.msftProducts
  }
}


export default connect(mapStateToProps)(LabSubmittedCompletedNominationsTable)