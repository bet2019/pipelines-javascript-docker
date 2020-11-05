import React, { useState, useEffect } from 'react'
import permissionAbility, { Can } from "src/_helpers/permission";
import Routing, { routesAPI, routesUI } from 'src/_helpers/routing';
import api from 'src/_helpers/api';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { FcHighPriority as IconFcHighPriority } from "react-icons/fc";
import Table from 'antd/lib/table'
import Tabs from 'antd/lib/tabs'
import SprintNumberName from '../../nominations/scenes/components/SprintNumberName';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FormatDateString from 'src/_components/FormatDateString';
import config from 'src/config';
import urlHelper from 'src/_helpers/urlHelper';

const NominationRequireAttentionReport = props => {

  let [data, setData] = useState(null)
  let [activeTabKey, setActiveTabKeyRaw] = useState("0")
  let [currentPage, setCurrentPageRaw] = useState(1)

  useEffect(()=>{
    const fetchData = async () => {
      if (permissionAbility.can('do', 'acl:lab_internal_info')) {
        let res = await api.get(routesAPI.internal.reports.nomination_require_attention)
        setData(res.data)
      } else {
        setData([])
      }
    }
    fetchData()
    let urlParams = urlHelper.parseSearchContentToObject()
    if (urlParams && urlParams['nom-req-att'] && urlParams['nom-req-att'].tab) {
      setActiveTabKeyRaw(urlParams['nom-req-att'].tab)
    }
    if (urlParams && urlParams['nom-req-att'] && urlParams['nom-req-att'].page) {
      setCurrentPageRaw(urlParams['nom-req-att'].page)
    }
  }, [])

  useEffect( () => {
    buildSearchUrl()
  }, [activeTabKey, currentPage])

  const buildSearchUrl = () => {
    urlHelper.replaceStateWithFilterParams({
      'nom-req-att': {
        tab: activeTabKey,
        page: currentPage
      }
    })
  }

  const setActiveTabKey = key => {
    setActiveTabKeyRaw(key)
    setCurrentPageRaw(1)
  }
  
  const setCurrentPage = pageNumber => {
    setCurrentPageRaw(pageNumber)
  }

  const renderContent = () => {

    return (
      <div className="tabs-card-container">
      <Tabs type="card" activeKey={activeTabKey} onChange={(key)=>setActiveTabKey(key)}>
        <Tabs.TabPane tab="Labs" key="0">
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}} className="text-center">
          {
            Object.values(data).map(item => {
              if (item.labId == 0 || Object.keys(item.nominations).length == 0 ) {
                return ''
              }
              
              return (
                <div className="text-center mg-r-20 hoverable shadow-border" key={`first-dashboard-${item.labId}`}
                  onClick={()=>{
                    setActiveTabKey(`tab-lab-${item.labId}`)
                  }}
                >
                  <div className="p-15">
                  <h2>{item.labName}</h2>
                  <span className="text-danger">{Object.keys(item.nominations).length} item{Object.keys(item.nominations).length>1?'s':''}</span> 
                  &nbsp;to fix!
                  </div>
                </div>
              )
            })
          }
          </div>
        </Tabs.TabPane>
        {
          Object.values(data).map(item => {
            if (item.labId == 0 || Object.keys(item.nominations).length == 0 ) {
              return ''
            }
            return (
              <Tabs.TabPane key={`tab-lab-${item.labId}`} tab={<span>{item.labName} <span className="text-danger">{Object.keys(item.nominations).length} item{Object.keys(item.nominations).length>1?'s':''}</span> </span>} >
              
                  <Table 
                    className="table-pagination-center"
                    columns={[
                      {
                        title: 'Nomination',
                        dataIndex: 'companyName',
                        render: (text, record, index) => {
                          return (
                            <>
                            {
                            permissionAbility.can('do', 'acl:nominations/view/general_info')
                            ? <Link to={Routing.generate(routesUI.internalUser.nominations.view, {nominationId: record.uuid})}>
                                {record.companyName}
                              </Link>
                            : record.companyName
                            }
                            &nbsp;(<SprintNumberName number={record.engagementSprintN} questionReplace={true}/>)
                            </>
                          )
                          
                        }
                      },
                      {
                        title: 'Assigned PM',
                        dataIndex: 'engagementProjectManager.fullName',
                        align: 'center',
                        width:'15%'
                      },
                      {
                        title: 'Status',
                        dataIndex: 'statusId',
                        align: 'center',
                        width: "15%",
                        render: (text, record, index) => {return props.nominationStatuses[text].name}
                      },
                      {
                        title: 'No Writeup',
                        dataIndex: 'isCompletedButNoWriteup',
                        align: 'center',
                        width: "15%",
                        render: (text, record, index) => {return text === true ? <span className="text-warning text-bold">Missing</span> : '-'}
                      },
                      {
                        title: 'Last Followup',
                        dataIndex: 'isActiveWithLastFollowupDate',
                        align: 'center',
                        width: "15%",
                        render: (text, record, index) => {return text !== null ? <span className="text-warning text-bold">{FormatDateString({text: text, format: config.dateFormat, ago: true, agoTooltip: true})}</span> : '-'}
                      },
                    ]} 
                    dataSource={Object.values(item.nominations)} 
                    onChange={ (pagination) => {
                      setCurrentPage(pagination.current)
                    }}
                    pagination={{
                      current: currentPage
                    }}
                    rowKey={'uuid'}
                    size="small" 
                  />
              </Tabs.TabPane>
            )
          })
        }
      </Tabs>
      </div>
    )
  }

  if (!data || Object.keys(data).length < 2) {
    return ''
  }

  return (
    <Can I="do" a="acl:lab_internal_info">
      <div className={props.className}>
        <h3 className="mg-t-20">Nominations require attention <IconFcHighPriority /></h3>
        <Row gutter={8}>
          {renderContent()}
        </Row>
      </div>      
    </Can>
  )
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses
  }
}


export default connect(mapStateToProps)(NominationRequireAttentionReport)