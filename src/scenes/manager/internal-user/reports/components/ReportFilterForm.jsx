import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import {AiOutlineFileExcel as IconAiOutlineFileExcel} from 'react-icons/ai'

export const REPORT_FILTER_FORM_ID = 'report-filter-form-id'

class ReportFilterForm extends FormMixin(React.Component)
{

  render() {
    return (
      <form>
        <Row gutter={8}>
                
              {
                undefined !== this.props.monthRange && true === this.props.monthRange
                ? <div className="form-group pull-left">
                    <label>Period</label>
                    <div>     
                      <Field 
                        name="dateRange"
                        size="default"
                        component={this.renderMonthRangeField}
                        allowClear={false}
                        // dateFormat={config.dateFormat}
                      />
                    </div>
                  </div>
                : ''
              }

              {
                undefined !== this.props.productCategoryGrouping && true === this.props.productCategoryGrouping
                ? <Col span={6}>
                    <Field 
                      name="groupBy"
                      label="Group products by categories"
                      size="default"
                      className="form-group pull-left"
                      component={this.renderSelectField}
                      data={[{
                        value: 'category_by_azure',
                        title: 'Azure default categories'
                      },{
                        value: 'category_iot_aiml_other',
                        title: 'IoT / AI + Azure ML / Other'
                      },{
                        value: 'category_iothub_vision_speech_ml_other',
                        title: 'IoT Hub / Speech / Vision / Azure ML / Other'
                      }]}
                      allowClear={false}
                    />
                  </Col>
                : ''
              }
              
              {
                undefined !== this.props.extraElements
                ? this.props.extraElements.map( (el ,idx) => {
                  return (
                    <Col span={6} key={`extra-col-el-${idx}`}>
                      <Field
                        key={`extra-el-${idx}`}
                        {...el}
                        component={this[el.component]}
                      />
                    </Col>
                  )
                })
                : ''
              }
          
            <Col className="pull-right" >
              {
                this.props.onExport 
                ? <Button
                    onClick={this.props.onExport}
                    type="primary"
                  >
                    <Icon component={IconAiOutlineFileExcel} />
                    Export to Excel
                  </Button>
                : ''
              }
            </Col>
            <div className="clearfix"/>
        </Row>
      </form>
    )
  }
}

ReportFilterForm = reduxForm({
  form: REPORT_FILTER_FORM_ID,
  enableReinitialize: true
})(ReportFilterForm)

export default connect()(ReportFilterForm)