import React from 'react';
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import {Field} from 'redux-form'
import validationConstraints from 'src/_helpers/validationConstraints';
import FormMixin from 'src/_mixin/FormMixin';
import { Can } from 'src/_helpers/permission';


class CompanyAbstractForm extends FormMixin(React.Component) {
  render() {
    return (
      <>
        <Row gutter={8} className="company-form">
          <Col span={8}>
            <Field
              name="name"
              className="form-group external-user-access"
              label="Company name"
              component={this.renderInputField}
              required={true}
              validate={[validationConstraints.required]}
            />
            <Field
              name="url"
              className="form-group external-user-access"
              label="Company website url"
              component={this.renderInputField}
            />        
            <Field
              name="country"
              className="form-group external-user-access"
              label="Company country origin"
              showSearch
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              component={this.renderSelectField}
              data={this.props.countries}     
              titleProperty="name"
              valueProperty="code"
              allowClear={true}
            />       
            <Can I="do" a="acl:lab_internal_info">
              <Field
                name="msTeamsChannelLink"
                className="form-group"
                label="MS Teams channel link"
                component={this.renderInputField}
                allowClear={true}
              />
            </Can> 
          </Col>            
          <Col span={16}>
            <Field
              name="companyBrief"
              className="form-group"
              label="Company brief"
              component={this.renderTextAreaField}
              allowClear={true}
              rows={5}
            />    
          </Col>
        </Row>
      </>
    )
  }
}

export default CompanyAbstractForm