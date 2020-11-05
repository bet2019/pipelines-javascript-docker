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
import LabSubmittedCompletedNominationsTable from '../components/LabSubmittedCompletedNominationsTable';
import urlHelper from 'src/_helpers/urlHelper';
import ReportFilterForm, { REPORT_FILTER_FORM_ID } from '../components/ReportFilterForm';


class CompletedNominationsSummary extends React.Component {

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
        groupBy: 'category_iothub_vision_speech_ml_other'
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
    return reportService.getCompletedSummary(filterData)
      .then( res => {
        this.setState({
          filterData,
          data: res.data.completedEngagements
        })
      })
  }


  render() {
    if (!this.state.data) {
      return <LogoLoadingSpinner />
    }
    return (
      <Can I="do" a="acl:reports/view">
        <PageTitle title="Report :: Completed nominations summary">
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
                        return reportService.getCompletedSummary({...this.state.filterData, export2xlsx: true})
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

            <LabSubmittedCompletedNominationsTable 
              completedEngagements={this.state.data}
            />

          </section>
        </PageTitle>
      </Can>
    )
  }
}

export default connect()(CompletedNominationsSummary)