import React from 'react'
import permissionAbility, { Can } from 'src/_helpers/permission';
import PageTitle from 'src/_components/PageTitle';
import reportService from '../reportService';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import {connect} from 'react-redux'
import moment from 'moment';
import {reset} from 'redux-form'
import LabSubmittedCompletedNominationsCharts from '../components/LabSubmittedCompletedNominationsCharts';
import urlHelper from 'src/_helpers/urlHelper';
import ReportFilterForm, { REPORT_FILTER_FORM_ID } from '../components/ReportFilterForm';


class SubmittedCompletedNominationsStat extends React.Component {

  constructor(props) {
    super(props)
    this.props.dispatch(reset(REPORT_FILTER_FORM_ID))
    this.state = {
      data: null,
      filterData: {
        dateRange: [
          moment().startOf('month').subtract(6, 'months').format(), 
          moment().endOf('month').format()
        ],
      }
    }

  }

  componentDidMount() {
    let {dateRange} = urlHelper.parseSearchContentToObject() || this.state.filterData
    if (permissionAbility.can('do', 'acl:reports/view')) {
      return this.applyFilter({
        dateRange
      }, false)
    }
  }

  applyFilter(filterData, replaceUrlState = true) {
    if (replaceUrlState) {
      urlHelper.replaceStateWithFilterParams(filterData)
    }
    return reportService.getSubmittedCompletedStatistics(filterData)
      .then( res => {
        this.setState({
          filterData,
          data: {
            nominationStatusSourceTotalCountsByLab: res.data.nominationStatusSourceTotalCountsByLab || [],
            nominationStatusSourceTotalCountsWithoutDraftDeletedResultByLab: res.data.nominationStatusSourceTotalCountsWithoutDraftDeletedResultByLab || [],
            completedEngagementsInATimeRangeByLab: res.data.completedEngagementsInATimeRangeByLab || [],
          }
        })
      })
  }


  render() {
    if (!this.state.data) {
      return <LogoLoadingSpinner />
    }
    return (
      <Can I="do" a="acl:reports/view">
        <PageTitle title="Report :: Submitted & Completed nominations stat">
          <section className="report">
            <Row className="mg-t-20">
              <Col>
                <ReportFilterForm
                  monthRange={true}
                  initialValues={this.state.filterData}
                  onChange={(values,a,b,formPreviousValues)=>{
                    if (Object.keys(formPreviousValues).length === 0){
                      return 
                    }
                    this.applyFilter(values)                    
                  }}
                />
              </Col>                    
            </Row>

            <LabSubmittedCompletedNominationsCharts 
              nominationStatusSourceTotalCountsByLab={this.state.data.nominationStatusSourceTotalCountsByLab}
              nominationStatusSourceTotalCountsWithoutDraftDeletedResultByLab={this.state.data.nominationStatusSourceTotalCountsWithoutDraftDeletedResultByLab}
              completedEngagementsInATimeRangeByLab={this.state.data.completedEngagementsInATimeRangeByLab}
            />
            
          </section>
        </PageTitle>
      </Can>
    )
  }
}

export default connect()(SubmittedCompletedNominationsStat)