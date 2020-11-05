import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import {connect} from 'react-redux'
import Card from 'antd/lib/card'
import Tabs from 'antd/lib/tabs'
import {IoMdShareAlt as IconIoMdShareAlt} from 'react-icons/io'
import Tooltip from 'antd/lib/tooltip'
import ReactFrappeChart from "react-frappe-charts";
import config from 'src/config';
import HelpPixel, { helpTopics } from 'src/_components/helpPixel';
import permissionAbility from 'src/_helpers/permission';


class LabSubmittedCompletedNominationsCharts extends React.Component {

  generateCardExtraActions = (hasData, chartReference) => {
    return hasData 
            ? (permissionAbility.can('do', 'acl:reports/export')
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

  renderCompletedCountsChart = (labId) => {

    let chartRef = {current:null};  
    let content = ''
    let hasData = !!this.props.completedEngagementsInATimeRangeByLab[labId];

    if (!hasData) {
      content = <div className="text-center mg-40">No data</div>
    } else {
      let data = Object.values(this.props.completedEngagementsInATimeRangeByLab[labId].data)

      let labels = data.map(i=>i.label)
      let datasets = [{ values: data.map(i=>i.value) }]

      if (labels.length == 1) {
        labels.unshift("")
        labels.push("")
        datasets[0].values.unshift('')
        datasets[0].values.push('')
      }

      content = (
        <ReactFrappeChart
          id={`${labId}-CompletedCounts-chart`}
          type="line"
          colors={["#f00"]}
          axisOptions={{ xAxisMode: "tick", /* yAxisMode: "tick", */ xIsSeries: 1 }}
          // height={250}
          valuesOverPoints={1}
          lineOptions={{
            dotSize: 6
          }}
          data={{
            labels: data.map(i=>i.label),
            datasets: [{ values: data.map(i=>i.value) }]
          }}
          chartRef={chartRef}
        />    
      )
    }

    return (
      <Card 
        title="Completed engagements totals" 
        bordered={false}
        type="inner"
        bodyStyle={{padding: "0px"}}
        extra={this.generateCardExtraActions(hasData, chartRef)}
      >
        {content}
      </Card>
    )
  }

  renderCompletedCountsBySourceChart = (labId) => {
    let content = '';
    let hasData = !!this.props.completedEngagementsInATimeRangeByLab[labId];
    let labels = []
    let datasets = {}
    let chartRef = {current:null};     

    if (!hasData) {
      content = <div className="text-center mg-40">No data</div>
    } else {
      let data = Object.values(this.props.completedEngagementsInATimeRangeByLab[labId].data)
    

      data.map( monthData => {
        labels.push(monthData.label)
        Object.values(monthData.bySource.items).map( sourceItem => {
          if (!datasets[sourceItem.sourceId]) {
            datasets[sourceItem.sourceId] = {
              name: sourceItem.label,
              values: [],
              chartType: 'bar'
            }
          }
          datasets[sourceItem.sourceId].values.push(sourceItem.value || 0)
        })
      })

      datasets = Object.values(datasets)
      if (labels.length == 1) {
        labels.unshift("")
        labels.push("")
        datasets[0].values.unshift('')
        datasets[0].values.push('')
      }

      content = (
        <ReactFrappeChart
          id={`${labId}-CompletedCountsBySource-chart`}
          type='axis-mixed'
          valuesOverPoints={1}
          axisOptions={{ xAxisMode: "tick"}}
          // colors={['red','yellow','green']}
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
        title="Completed engagements by source" 
        bordered={false}
        type="inner"
        bodyStyle={{padding: "0px"}}
        extra={this.generateCardExtraActions(hasData, chartRef)}
      >
        {content}
      </Card>
    )
  }

  renderNominationsTotalBySourceChart = (labId) => {
    let content = ''
    let hasData = !!this.props.nominationStatusSourceTotalCountsWithoutDraftDeletedResultByLab[labId];
    let chartRef = {current:null};  

    if (!hasData) {
      content = <div className="text-center mg-40">No data</div>
    } else {
      let data = Object.values(this.props.nominationStatusSourceTotalCountsWithoutDraftDeletedResultByLab[labId].sources)

      let labels = data.map(i=>i.label)
      let datasets = [{values: data.map(i=>i.value)}]

      if (labels.length == 1) {
        labels.unshift("")
        labels.push("")
        datasets[0].values.unshift('')
        datasets[0].values.push('')
      }

      content = (
        <ReactFrappeChart
          id={`${labId}-NominationsTotalBySource-chart`}
          type='bar'
          animate={1}
          valuesOverPoints={1}
          axisOptions={{ yAxisMode: "tick"}}
          colors={[config.charts.bars.defaultColor]}
          data={{
            labels,
            datasets,
          }}
          chartRef={chartRef}
        />
      )
    }

    return (
      <Card 
        title={<>Submitted nominations by source <HelpPixel topic={helpTopics.app.nominationsTotalBySourceChartExcludedStatuses}/></>}
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
    if (!this.props.nominationStatusSourceTotalCountsByLab) {
      return <LogoLoadingSpinner />
    }

    return (
      <Tabs className="mg-t-20">
      {
        Object.values(this.props.nominationStatusSourceTotalCountsByLab).map( (item, idx) => {
          return (
            <Tabs.TabPane tab={item.labName} key={idx}>
              <div>
                <Row gutter={16} className="mg-t-20">
                  <Col span={8}>
                    <Card 
                      title="Submitted nominations" 
                      bordered={false}
                      type="inner"
                    >
                      <dl className="dl-horizontal">
                        {
                          Object.keys(item.status).map( key => {
                            return (
                              <span key={item.labId+key}>
                              <dt>{this.props.nominationStatuses[key].name}</dt>
                              <dd className="text-right">{item.status[key]}</dd>
                              </span>
                            )
                          })
                        }
                        <dt className="text-strong">
                          Total
                        </dt>
                        <dd className="text-strong text-right">
                          {Object.values(item.status).reduce((accum=0, curr) => accum+curr)}
                        </dd>
                      </dl>
                    </Card>
                  </Col>
                  <Col span={16}>
                    {this.renderCompletedCountsChart(item.labId)}
                  </Col>
                </Row>
                <Row gutter={16} className="mg-t-20">
                  <Col span={8}>
                    {this.renderNominationsTotalBySourceChart(item.labId)}
                  </Col>

                  <Col span={16}>
                    {this.renderCompletedCountsBySourceChart(item.labId)}
                  </Col>
                </Row>
              </div>
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
    nominationStatuses: state.rootApp.nominationStatuses
  }
}

export default connect(mapStateToProps)(LabSubmittedCompletedNominationsCharts)