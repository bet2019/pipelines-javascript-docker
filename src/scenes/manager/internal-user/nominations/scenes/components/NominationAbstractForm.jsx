import React from "react";
import validationConstraints from "src/_helpers/validationConstraints";
import FormMixin from "src/_mixin/FormMixin";
import {Field} from 'redux-form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import { Can } from 'src/_helpers/permission';

class NominationAbstractForm extends FormMixin(React.Component) {
  render() {
    return (
      <div className="mg-t-40 nomination-form">
        <h2>Project details</h2>

        <Row gutter={8} className="mg-t-10">
          <Col>
            <Field
              name="projectBrief"
              className="form-group"
              label="Project brief"
              component={this.renderTextAreaField}
              rows={5}
            />
          </Col>
        </Row>

        <Row gutter={8}>            
          <Col span={8}>
            <Card title="Company contact" size="small">
              <Field
                name="contactPersonName"
                className="form-group external-user-access"
                label="Contact person name"
                component={this.renderInputField}
              />
              <Field
                name="contactPersonRole"
                className="form-group external-user-access"
                label="Contact person role"
                component={this.renderInputField}
              />
              <Field
                name="contactPersonEmail"
                className="form-group external-user-access"
                label="Contact person email"
                component={this.renderInputField}
                validate={[validationConstraints.email]}
              />
              <Field
                name="contactPersonPhone"
                className="form-group external-user-access"
                label="Contact person phone"
                component={this.renderInputField}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Microsoft contact" size="small">
              <Field
                name="microsoftContactName"
                className="form-group external-user-access"
                label="MSFT contact name"
                component={this.renderInputField}
              />
              <Field
                name="microsoftContactEmail"
                className="form-group external-user-access"
                label="MSFT contact email"
                component={this.renderInputField}
                validate={[validationConstraints.email]}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Field 
                name="labId"
                className="form-group external-user-access"
                label="Lab location"
                component={this.renderSelectField}
                data={this.props.labs}
                titleProperty="name"
                valueProperty="id"
                required={true}
                validate={[validationConstraints.required]}
              />
              <Field 
                name="sourceId"
                className="form-group"
                label="Nomination source"
                component={this.renderSelectField}
                data={this.props.nominationSources}
                titleProperty="name"
                valueProperty="id"
                required={true}
                validate={[validationConstraints.required]}
              />
              <Can I="do" a="acl:lab_internal_info">
                <Field
                  name="customerChannelId"
                  className="form-group"
                  label="Customer channel"
                  component={this.renderSelectField}
                  data={this.props.customerChannel}
                  titleProperty="name"
                  valueProperty="id"
                  allowClear={true}
                />
              </Can>
              <Field
                name="industryVerticalId"
                className="form-group external-user-access"
                label="Industry vertical"
                component={this.renderSelectField}
                data={this.props.industryVertical}                
                titleProperty="name"
                valueProperty="id"
                allowClear={true}
              />
              <Field
                name="msTpId"
                className="form-group"
                label="MSFT TPID"
                component={this.renderInputField}
              />
              <Field
                name="msOpportunityId"
                className="form-group"
                label="MSFT Opportunity Id"
                component={this.renderInputField}
              />
            </Card>
          </Col>            
        </Row>

        <Row gutter={16} className="mg-t-20">
          <Col span={12}>
            <Field
              name="numOfEngineers"
              className="form-group external-user-access"
              label="Number of engineers team will bring to lab"
              component={this.renderInputField}
            />                    

            <Field
              name="projectedNumDevices"
              className="form-group external-user-access"
              label="Projected # of devices or products"
              component={this.renderInputField}
            />
            
            <Field
              name="projectedDollarConsumptions"
              className="form-group"
              label="Projected revenue consumption"
              component={this.renderInputField}
            />
            <Field
              name="projectPhase"
              className="form-group external-user-access"
              label="Project phase"
              component={this.renderTextAreaField}
              rows={5}
            />            
          </Col>
          <Col span={12}>
            <Field
              name="azureCloudConsumptionLifetime"
              className="form-group external-user-access"
              label="Projected Microsoft Azure Consumption (lifetime of project) ($ USD)"
              component={this.renderInputField}
            />
            <Field
              name="azureCloudConsumption"
              className="form-group external-user-access"
              label="Projected Microsoft Azure Consumption (a year) ($ USD)"
              component={this.renderInputField}
            />
            <Field
              name="azureSubscriptionGuid"
              className="form-group external-user-access"
              label="Azure subscription GUID"
              component={this.renderInputField}
            />
          </Col>
        </Row>

        <Row gutter={16} className="mg-t-20">
          <Col span={12}>
          <h2>Marketing/Business Plan</h2>
          <Field
            name="iotOpportunity"
            className="form-group external-user-access"
            label="Described AI and/or IoT product"
            component={this.renderTextAreaField}
            rows={5}
          />
          
          <Field
            name="projectedAnnualRevenue"
            className="form-group external-user-access"
            label="Projected annual revenue for product/service"
            component={this.renderInputField}
          />

          <Field
            name="currentStatusDesc"
            className="form-group external-user-access"
            label="Current status of AI or IoT product as of today"
            component={this.renderTextAreaField}
            rows={5}
          />
          
          <Field
            name="marketOpportunity"
            className="form-group external-user-access"
            label="Target market and customer benefit"
            component={this.renderTextAreaField}
            rows={5}
          />
          
          <Field
            name="projectedSoldAnnually"
            className="form-group external-user-access"
            label="Projected number of products sold annually"
            component={this.renderInputField}
          />
          
          <Field
            name="productPhasesDesc"
            className="form-group external-user-access"
            label="Product phases and target dates for each launch"
            component={this.renderTextAreaField}
            rows={5}
          />
          
          <Field
            name="totalBenefits"
            className="form-group"
            label="Target benefits"
            component={this.renderTextAreaField}
            rows={5}
          />
          </Col>
          <Col span={12}>
            <h2>Technical Overview and Objectives for Lab Visit</h2>
            
            <Field
              name="iotDesign"
              className="form-group external-user-access"
              label="Technical Overview of AI or IoT Design"
              component={this.renderTextAreaField}
              rows={5}
            />
            
            <Field
              name="microsoftTechnologies"
              className="form-group external-user-access"
              label="Microsoft Technologies used in this project"
              component={this.renderTextAreaField}
              rows={5}
            />
            
            <Field
              name="prioritizedWorkStreamDesc"
              className="form-group external-user-access"
              label="Prioritized the workstreams and details for each workstream to work on in the lab "
              component={this.renderTextAreaField}
              rows={5}
            />
            
            <Field
              name="iotCloudTechnologies"
              className="form-group external-user-access"
              label="Cloud Technologies"
              component={this.renderTextAreaField}
              rows={5}
            />
            
            <Field
              name="iotTechnologies"
              className="form-group"
              label="IoT technologies"
              component={this.renderTextAreaField}
              rows={5}
            />
            </Col>
        </Row>
      </div>
    )
  }
}

export default NominationAbstractForm