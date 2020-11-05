import React from 'react';
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { Field } from 'react-final-form'
import validationConstraints, { composeValidators } from 'src/_helpers/validationConstraints';
import { useTranslation } from 'react-i18next';
import FormInputField from 'src/_components/form/FormInputField';
import FormSelectField from 'src/_components/form/FormSelectField';


const CompanyAbstractForm = props => {
  const {i18n } = useTranslation(['nominations'])

  return (
    <>
      <Row gutter={8} className="company-form">
        <Col span={8}>
          <Field
            name={`${props.fieldPrefix?props.fieldPrefix+'.':''}name`}
            className="form-group"
            label={i18n.t('nominations:company_name')}
            component={FormInputField}
            required={true}
            validate={composeValidators([validationConstraints.required])}
          />
        </Col>    
        <Col span={8}>
          <Field
            name={`${props.fieldPrefix?props.fieldPrefix+'.':''}url`}
            className="form-group"
            label={i18n.t('nominations:company_website')}
            component={FormInputField}
          /> 
        </Col>
        <Col span={8}>
          <Field
            name={`${props.fieldPrefix?props.fieldPrefix+'.':''}country`}
            className="form-group"
            label={i18n.t('nominations:company_country')}
            component={FormInputField}
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            component={FormSelectField}
            dataSource={props.countries}     
            titleProperty="name"
            valueProperty="code"
            allowClear={false}              
            required={true}
            validate={composeValidators([validationConstraints.required])}
          />          
        </Col>
      </Row>
    </>
  )
}

export default CompanyAbstractForm