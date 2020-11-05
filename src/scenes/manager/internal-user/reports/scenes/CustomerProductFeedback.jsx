import React from 'react'
import permissionAbility, { Can } from 'src/_helpers/permission';
import PageTitle from 'src/_components/PageTitle';
import reportService from '../reportService';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Rate from 'antd/lib/rate'
import Card from 'antd/lib/card'
import Tabs from 'antd/lib/tabs'
import {
  IoMdShareAlt as IconIoMdShareAlt,
  IoMdArrowDropdown as IconIoMdArrowDropdown,
  IoMdArrowDropright as IconIoMdArrowDropright
} from 'react-icons/io'
import Tooltip from 'antd/lib/tooltip'
import Collapse from 'antd/lib/collapse'
import {Link} from 'react-router-dom'
import MsftProductItem from 'src/_components/MsftProductItem';
import {connect} from 'react-redux'
import moment from 'moment'
import Routing, { routesUI } from 'src/_helpers/routing';
import ReactFrappeChart from 'react-frappe-charts';
import config from 'src/config';
import ReportFilterForm from '../components/ReportFilterForm';
import urlHelper from 'src/_helpers/urlHelper';
import SprintNumberName from '../../nominations/scenes/components/SprintNumberName';

class CustomerProductFeedback extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null, 
      filterData: {
        groupBy: 'category_iothub_vision_speech_ml_other',
        dateRange: [
          moment().startOf('month').subtract(6, 'months').format(), 
          moment().endOf('month').format()
        ]
      }
    }
  }

  componentDidMount() {
    let {groupBy, dateRange} = urlHelper.parseSearchContentToObject() || this.state.filterData
    if (permissionAbility.can('do', 'acl:reports/view')) {
      return this.applyFilter({
        groupBy, 
        dateRange
      }, false)    
    }
  }

  applyFilter(filterData, replaceUrlState = true) {
    if (replaceUrlState) {
      urlHelper.replaceStateWithFilterParams(filterData)
    }
    return reportService.getCustomerProductFeedback(filterData)
    .then( res => {
      this.setState({
        filterData,
        data: res.data
      })
    })
  }

  calculateRatingValue = (ratingArray) => {
    if (ratingArray.length === 0) {
      return 0
    }

    return ratingArray.reduce((acc, val)=>acc+=val, 0)/ratingArray.length
  }

  linkToWriteup = (nominationId, writeupId, title , engagementSprintN) => {
    return permissionAbility.can('do', 'acl:nominations::writeups/manage')
        || permissionAbility.can('do', 'acl:nominations::writeups/view')
      ? <Link to={Routing.generate(routesUI.internalUser.nominations.writeups.view, {nominationId, writeupId})}>
          {title} (<SprintNumberName number={engagementSprintN} questionReplace={true}/>)
        </Link>
      : <>{title} (<SprintNumberName number={engagementSprintN} questionReplace={true}/>)</>
      
  }

  generateCardExtraActions = (hasData, chartReference) => {
    return hasData 
            ? (
              permissionAbility.can('do', 'acl:reports/export')
              ? <a onClick={ ()=> { 
                // FIXME: add a title to the exported charts
                chartReference.current.export()
                } }>
                  <Tooltip placement="top" title={"Export"}>
                    <IconIoMdShareAlt/>
                  </Tooltip>
                </a> 
              : ''
            )
            : ''
  }

  renderEngagementsTotalByProductGroupsChart = (labId) => {
    if (!this.state.data[labId]) {
      return ''
    }
    let content = ''
    let data = Object.values(this.state.data[labId].productCategories);
    let hasData = data.length !== 0
    let chartRef = {ref:null};  

    if (!hasData) {
      content = <div className="text-center mg-40">No data</div>
    } else {

      let labels = data.map(i=>i.categoryId)
      let datasets = [{values: data.map(i=>Object.keys(i.nominations).length)}]

      if (labels.length == 1) {
        labels.unshift("")
        labels.push("")
        datasets[0].values.unshift('')
        datasets[0].values.push('')
      }

      content = (
        <ReactFrappeChart
          id={`${labId}-EngagementsTotalByProductGroups-chart`}
          type='bar'
          animate={1}
          valuesOverPoints={1}
          axisOptions={{ yAxisMode: "tick"}}
          colors={[config.charts.bars.defaultColor]}
          data={{
            labels,
            datasets
          }}
          chartRef={chartRef}
        />
      )
    }

    return (
      <Card 
        title="Engagements by product category" 
        bordered={false}
        type="inner"
        bodyStyle={{padding: "0px"}}
        extra={this.generateCardExtraActions(hasData, chartRef)}
      >
      {content}
      </Card>
    )
  }

  renderProductTotalByProductInCategoryChart = (categoryData) => {
    let content = ''
    let data = Object.values(categoryData.products)
    let hasData = data.length !== 0
    let chartRef = {ref:null};  

    if (!hasData) {
      content = <div className="text-center mg-40">No data</div>
    } else {

      let labels = data.map(i=>i.productName)
      let datasets = [{values: data.map(i=>Object.keys(i.nominations).length)}]

      if (labels.length == 1) {
        labels.unshift("")
        labels.push("")
        datasets[0].values.unshift('')
        datasets[0].values.push('')
      }

      content = (
        <ReactFrappeChart
          type='bar'
          animate={1}
          valuesOverPoints={1}
          axisOptions={{ yAxisMode: "tick"}}
          colors={[config.charts.bars.defaultColor]}
          data={{
            labels,
            datasets
          }}
          chartRef={chartRef}
        />
      )
    }

    return (
      <Card 
        title={<>Products which were used in the <b>{categoryData.categoryName}</b> category</>}
        bordered={false}
        type="inner"
        bodyStyle={{padding: "0px"}}
        extra={this.generateCardExtraActions(hasData, chartRef)}
      >
      {content}
      </Card>
    )
  }

  render() {
    if (!this.state.data) {
      return <LogoLoadingSpinner />
    }

    return (
      <Can I="do" a="acl:reports/view">
        <PageTitle title="Report :: Product Feedback">
          <section className="report">
            <Row className="mg-t-20">
                <Col>
                  <ReportFilterForm
                    monthRange={true}
                    productCategoryGrouping={true}
                    initialValues={this.state.filterData}
                    onExport={
                      permissionAbility.can('do', 'acl:reports/export')
                      ? ()=>{
                          return reportService.getCustomerProductFeedback({...this.state.filterData, export2xlsx: true})
                        }
                      : undefined
                    }
                    onChange={(values,a,b,formPreviousValues)=>{
                      if (Object.keys(formPreviousValues).length === 0){
                        return 
                      }
                      this.applyFilter(values)                    
                    }}
                  />
                </Col>                    
              </Row>

            <Tabs className="mg-t-20">
            {
              Object.values(this.state.data).map( (item, idx) => {
                if (!item) {
                  return ''
                }
                return (
                  <Tabs.TabPane tab={item.labName} key={idx}>
                    <div className="mg-b-20">
                      {this.renderEngagementsTotalByProductGroupsChart(item.labId)}
                    </div>
                    <Tabs tabPosition="left">
                    {
                      !item.productCategories
                      ? ''
                      : Object.values(item.productCategories).map( (category, catIdx) => {
                        return (
                          <Tabs.TabPane tab={(
                            <>
                              <div>
                                <strong>{category.categoryName}</strong>
                              </div>
                              <div>
                                <strong>{Object.keys(category.products).length}</strong> products | <strong>{Object.keys(category.nominations).length}</strong> engagements
                              </div>
                            </>
                          )} 
                          key={`cat-${category.categoryId}`}>
                            <div className="mg-b-40">
                              { this.renderProductTotalByProductInCategoryChart(category) }
                            </div>

                            <div className="mg-b-40">
                                <Collapse
                                  key={`${idx}-${catIdx}-all-nominations`}
                                  bordered={false}
                                  expandIcon={({ isActive }) => isActive ? <IconIoMdArrowDropdown/> : <IconIoMdArrowDropright/>}
                                >
                                  <Collapse.Panel 
                                    header={<>All <b>{Object.keys(category.nominations).length}</b> engagement(s) which were using products from the <strong>{category.categoryName}</strong> category</>} 
                                    key="1" 
                                    className="collapse-panel-grey"
                                    style={{
                                      background: 'rgb(192, 227, 255)',
                                      borderRadius: 4,
                                      border: 0,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <ul>
                                      {
                                        Object.values(category.nominations).map( (i, engagIdx) => {
                                          return (
                                            <li key={`${idx}-${catIdx}-all-nominations-${engagIdx}`}>
                                              - {this.linkToWriteup(i.nominationId, i.writeupId, i.companyName, i.engagementSprintN)}
                                            </li>
                                          )
                                        })
                                      }
                                    </ul>
                                  </Collapse.Panel>
                                </Collapse>
                              </div>

                            <h2 className="mg-b-10">Products:</h2>

                            {
                              Object.values(category.products).map( (product, productIdx) => {
                                let productRatingArray = Object.values(product.nominations).filter(i=>i.rating).map(i=>i.rating)

                                return (
                                  <Card key={`${idx}-${catIdx}-${productIdx}`} className="mg-b-20">
                                    <Row gutter={16}>
                                      <Col span={12}>
                                        <MsftProductItem 
                                          // showDocUrl={true}
                                          data={this.props.msftProducts[product.productId]}
                                        />
                                      </Col>
                                      <Col span={12} className="text-right">
                                        <Rate value={this.calculateRatingValue(productRatingArray)} disabled={true}/> <span>({productRatingArray.length})</span>
                                      </Col>
                                    </Row>
                                    <Row gutter={16} className="mg-t-40"  type="flex">
                                      <Col span={12} style={{overflowWrap: 'break-word'}}>                                        
                                        <h3 className="text-center mg-b-20">Feedback</h3>
                                        {
                                          Object.values(product.nominations).reduce((acc, val)=> acc += val.feedback ? 1 : 0 , 0) === 0
                                          ? <div className="text-center">N/A</div>
                                          : <ul>
                                              {
                                                Object.values(product.nominations).map( (i, feedbackIdx) => {
                                                  if (!i.feedback) {
                                                    return ''
                                                  }
                                                  return (
                                                    <li className="mg-b-20" key={`${idx}-${catIdx}-${productIdx}-feedbacks-${feedbackIdx}`}>
                                                      <div dangerouslySetInnerHTML={{__html: i.feedback}}/>
                                                      <div className="text-right text-italic">
                                                        by {this.linkToWriteup(i.nominationId, i.writeupId, i.companyName, i.engagementSprintN)}
                                                      </div>
                                                    </li>
                                                  )
                                                })
                                              }
                                            </ul>
                                        }
                                        
                                      </Col>
                                      <Col span={1} className="dividing-border">
                                      </Col>
                                      <Col span={11} style={{overflowWrap: 'break-word'}}>
                                        <h3 className="text-center mg-b-20">Bugs</h3>
                                        {
                                          Object.values(product.nominations).reduce((acc, val)=> acc += val.bugs ? 1 : 0 , 0) === 0
                                          ? <div className="text-center">N/A</div>
                                          : <ul>
                                            {
                                              Object.values(product.nominations).map( (i, bugsIdx) => {
                                                if (!i.bugs) {
                                                  return ''
                                                }
                                                return (
                                                  <li className="mg-b-20" key={`${idx}-${catIdx}-${productIdx}-bugs-${bugsIdx}`}>
                                                    <div dangerouslySetInnerHTML={{__html: i.bugs}}/>
                                                    <div className="text-right text-italic">
                                                      by {this.linkToWriteup(i.nominationId, i.writeupId, i.companyName, i.engagementSprintN)}
                                                    </div>
                                                  </li>
                                                )
                                              })
                                            }
                                          </ul>
                                        }
                                        
                                      </Col>
                                    </Row>
                                    <div className="mg-t-10">
                                      <Collapse
                                        key={`${idx}-${catIdx}-${productIdx}-nominations`}
                                        bordered={false}
                                        expandIcon={({ isActive }) => isActive ? <IconIoMdArrowDropdown/> : <IconIoMdArrowDropright/>}
                                      >
                                        <Collapse.Panel 
                                          header={<><b>{Object.keys(product.nominations).length}</b> engagement(s) were using the <strong>{product.productName}</strong> product</>} 
                                          key="1"
                                          style={{
                                            background: '#f7f7f7',
                                            borderRadius: 4,
                                            border: 0,
                                            overflow: 'hidden',
                                          }}
                                        >
                                          <ul>
                                            {
                                              Object.values(product.nominations).map( (i, engagIdx) => {
                                                return (
                                                  <li key={`${idx}-${catIdx}-${productIdx}-engagements-${engagIdx}`}>
                                                    - {this.linkToWriteup(i.nominationId, i.writeupId, i.companyName, i.engagementSprintN)}
                                                  </li>
                                                )
                                              })
                                            }
                                          </ul>
                                        </Collapse.Panel>
                                      </Collapse>
                                    </div>
                                  </Card>
                                  // <h3>{product.productName}</h3>
                                )
                              })
                            }

                            
                            
                          </Tabs.TabPane>
                        )
                      })
                    }
                    </Tabs>
                  </Tabs.TabPane>
                )
              })
            }
            </Tabs>            
          </section>
        </PageTitle>
      </Can>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    msftProducts: state.rootApp.msftProducts
  }
}


export default connect(mapStateToProps)(CustomerProductFeedback)