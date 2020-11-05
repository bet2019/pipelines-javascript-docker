import React from "react";
import validationConstraints, { composeValidators } from "src/_helpers/validationConstraints";
import { Field } from 'react-final-form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import { useTranslation } from "react-i18next";
import FormInputField from "src/_components/form/FormInputField";
import FormSelectField from "src/_components/form/FormSelectField";
import FormTextAreaField from "src/_components/form/FormTextAreaField";

const NominationAbstractForm = (props) => {
  const { t, i18n } = useTranslation('nominations');

  return (
    <div className="mg-t-40 nomination-form">
      <h2>{i18n.t('nominations:page.section_title.project_details')}</h2>

      <Row gutter={8}>            
        <Col span={8}>
          <Card title={i18n.t('nominations:page.section_title.company_contact')} size="small">
            <Field
              name="contactPersonName"
              className="form-group"
              label={i18n.t('nominations:label.contact_person_name')}
              component={FormInputField}
              required={true}
              validate={composeValidators([validationConstraints.required])}
            />
            <Field
              name="contactPersonRole"
              className="form-group"
              label={i18n.t('nominations:label.contact_person_role')}
              component={FormInputField}
              required={true}
              validate={composeValidators([validationConstraints.required])}
            />
            <Field
              name="contactPersonEmail"
              className="form-group"
              label={i18n.t('nominations:label.contact_person_email')}
              component={FormInputField}
              required={true}
              validate={composeValidators([validationConstraints.required, validationConstraints.email])}
            />
            <Field
              name="contactPersonPhone"
              className="form-group"
              label={i18n.t('nominations:label.contact_person_phone')}
              component={FormInputField}
              required={true}
              validate={composeValidators([validationConstraints.required])}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={i18n.t('nominations:page.section_title.msft_contact')} size="small">
            <Field
              name="microsoftContactName"
              className="form-group"
              label={i18n.t('nominations:label.msft_contact_name')}
              component={FormInputField}
            />
            <Field
              name="microsoftContactEmail"
              className="form-group"
              label={i18n.t('nominations:label.msft_contact_email')}
              component={FormInputField}
              validate={composeValidators([validationConstraints.email])}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Field 
              name="labId"
              className="form-group"
              label={i18n.t('nominations:label.lab_location')}
              component={FormSelectField}
              dataSource={props.labs}
              titleProperty="name"
              valueProperty="id"
              required={true}
              validate={composeValidators([validationConstraints.required])}
            />
            <Field
              name="industryVerticalId"
              className="form-group"
              label={i18n.t('nominations:company_industry_vertical')}
              component={FormSelectField}
              dataSource={props.industryVertical}                
              titleProperty="name"
              valueProperty="id"
              allowClear={true}
            />
            {/* {
              props.initialValues && props.initialValues.submittedAt
              ? <>Submitted: {props.initialValues.submittedAt}<br/></>
              : ''
            }
            {
              props.initialValues && props.initialValues.submittedAt
              ? <>Status: <strong>{props.initialValues.statusId}</strong></>
              : ''
            }                */}
          
          </Card>
        </Col>            
      </Row>

      <Row gutter={16} className="mg-t-20">
        <Col span={12}>
          <Field
            name="numOfEngineers"
            className="form-group"
            label={i18n.t('nominations:label.engineers_visiting')}
            component={FormInputField}
          />
                    
          <Field
            name="projectPhase"
            className="form-group"
            label={i18n.t('nominations:label.project_phase')}
            component={FormTextAreaField}
            rows={5}
          />          
        </Col>
        <Col span={12}>
          <Field
            name="azureCloudConsumptionLifetime"
            className="form-group"
            label={i18n.t('nominations:label.azure_lifetime_consumption')}
            component={FormInputField}
          />
          
          <Field
            name="azureCloudConsumption"
            className="form-group"
            label={i18n.t('nominations:label.azure_consumption')}
            component={FormInputField}
          />
          
          <Field
            name="azureSubscriptionGuid"
            className="form-group"
            label={i18n.t('nominations:label.azure_subscription')}
            component={FormInputField}
          />          
        </Col>
      </Row>

      <Row gutter={16} className="mg-t-20">
        <Col span={12}>
        <h2>{i18n.t('nominations:page.section_title.marketing_and_business')}</h2>
        <Field
          name="iotOpportunity"
          className="form-group"
          label={i18n.t('nominations:label.iot_opportunity')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />
        
        <Field
          name="projectedAnnualRevenue"
          className="form-group"
          label={i18n.t('nominations:label.projected_annual_revenue')}
          component={FormInputField}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />

        <Field
          name="currentStatusDesc"
          className="form-group"
          label={i18n.t('nominations:label.current_status')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />

        <Field
          name="marketOpportunity"
          className="form-group"
          label={i18n.t('nominations:label.market_and_customer_benefits')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />
        
        <Field
          name="projectedSoldAnnually"
          className="form-group"
          label={i18n.t('nominations:label.projected_sold_annually')}
          component={FormInputField}
        />
        
        <Field
          name="productPhasesDesc"
          className="form-group"
          label={i18n.t('nominations:label.product_phases_desc')}
          component={FormTextAreaField}
          rows={5}
        />

        </Col>

        <Col span={12}>
        <h2>{i18n.t('nominations:page.section_title.technology_and_objectives')}</h2>
        
        <Field
          name="iotDesign"
          className="form-group"
          label={i18n.t('nominations:label.iot_design')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />
        
        <Field
          name="microsoftTechnologies"
          className="form-group"
          label={i18n.t('nominations:label.msft_technology')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />
        
        <Field
          name="prioritizedWorkStreamDesc"
          className="form-group"
          label={i18n.t('nominations:label.prioritized_workstreams')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />
        
        <Field
          name="iotCloudTechnologies"
          className="form-group"
          label={i18n.t('nominations:label.iot_cloud_technologies')}
          component={FormTextAreaField}
          rows={5}
          required={true}
          validate={composeValidators([validationConstraints.required])}
        />      
        </Col>
      </Row>
    </div>
  )
}

export default NominationAbstractForm