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


class LabUpcomingNominationsTable extends React.Component {

  render() {
    return (

      <Tabs className="mg-t-20">
      {
        Object.values(this.props.upcomingEngagements).map( (lab, idx) => {
          
          return (
            <Tabs.TabPane tab={lab.name} key={`lab-${lab.id}`}>

              <Table 
                rowKey={record => record.nominationId}
                dataSource={lab.data}
                pagination={false}
                defaultExpandAllRows={true}
                expandedRowRender={(record, index, indent, expanded)=>{
                  return (
                    <Row gutter={25} key={`lab-${lab.id}-extended-row-${record.nominationId}`}>
                      <Col span={8}>
                        <div><strong>Company Brief:</strong></div>
                        <div dangerouslySetInnerHTML={{ __html: record.companyBrief ? record.companyBrief.replace(/\n/g, "<br />") : ''}} />
                      </Col>
                      <Col span={8}>
                        <div><strong>Project Brief:</strong></div>
                        <div dangerouslySetInnerHTML={{ __html: record.projectBrief ? record.projectBrief.replace(/\n/g, "<br />") : ''}} />
                      </Col>
                      <Col span={8}>
                        <div><strong>Microsoft Technologies planned to use:</strong></div>
                        <div dangerouslySetInnerHTML={{ __html: record.microsoftTechnologies ? record.microsoftTechnologies.replace(/\n/g, "<br />") : ''}} />
                        <br />
                        <div><strong>Cloud Technologies planned to use:</strong></div>
                        <div dangerouslySetInnerHTML={{ __html: record.iotCloudTechnologies ? record.iotCloudTechnologies.replace(/\n/g, "<br />") : ''}} />
                      </Col>
                        {/* <div className="mg-b-20"><strong>Products in project</strong></div>
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
                        } */}
                      
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
                            Planned dates:&nbsp;
                            <span className="text-strong">
                              {
                                record.engagementDates.constructor.name == 'Array'
                                ?  <DateRangeFormatter 
                                    date1={record.engagementDates[0]}
                                    date2={record.engagementDates[1]}
                                    format={config.dateFormatMMMDYYYY}
                                  />
                                : 'N/A'
                              }
                            </span>
                          </div>
                          <div>
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
                          </div>
                        </>
                      )
                    }
                  },
                  {
                    title: 'Planned at',
                    dataIndex: 'engagementStartMonth',
                    key: 'engagementStartMonth',                    
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


export default connect(mapStateToProps)(LabUpcomingNominationsTable)