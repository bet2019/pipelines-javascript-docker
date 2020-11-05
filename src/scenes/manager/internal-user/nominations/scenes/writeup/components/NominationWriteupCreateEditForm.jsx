import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import {Field, FieldArray, reset, submit, reduxForm}from 'redux-form'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import {IoMdClose as IconIoMdClose} from 'react-icons/io'
import validationConstraints from 'src/_helpers/validationConstraints';
import {connect} from 'react-redux'
import MsftProductItem from 'src/_components/MsftProductItem';
import FormLevelErrorPlaceholder from 'src/_components/form/FormLevelErrorPlaceholder';
import SprintNumberName from '../../components/SprintNumberName';

const NOMINATION_WRITEUP_CREATE_EDIT_FORM_ID = 'nomination-writeup-create-edit-form-id'

class NominationWriteupCreateEditForm extends FormMixin(React.Component) {

  constructor(props) {
    super(props)

    this.state = {
      saveProcessingLoading: false,
    }
  }

  componentDidMount = () => {
    this.props.dispatch(reset(NOMINATION_WRITEUP_CREATE_EDIT_FORM_ID))
  }

  renderTargetWorkstreams = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div>
          {fields.map((item, index) => (
            <div key={index} className="p-l-25 p-r-25 mg-b-20">
              <Row gutter={8}>
                <Col span={12}>
                  {/* #{index+1} */}
                </Col>
                <Col span={12} className="text-right">
                  <a>
                    <IconIoMdClose
                      onClick={() => fields.remove(index)}
                    />
                  </a>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={2}>
                  <Field
                    name={`${item}.n`}
                    component={this.renderInputField}
                    label="#"
                  />
                </Col>
                <Col span={11}>
                  <Field
                    name={`${item}.task`}
                    label="Task"
                    component={this.renderTextAreaField}
                    rows={3}
                  />
                </Col>
                
                <Col span={11}>
                  <Field
                    name={`${item}.description`}
                    label="Description"
                    component={this.renderTextAreaField}
                    rows={3}
                  />                
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={2}>
                  <label>Completed?</label>
                  <Field
                    name={`${item}.isCompleted`}
                    // label="Completed?"
                    component={this.renderCheckboxField}
                    defaultChecked={
                      this.props.initialValues 
                      && this.props.initialValues.sprint
                      && this.props.initialValues.sprint.targetWorkstreams
                      && this.props.initialValues.sprint.targetWorkstreams[index]
                      && this.props.initialValues.sprint.targetWorkstreams[index].isCompleted
                    }
                  />
                </Col>
                <Col span={11}>
                  <Field
                    name={`${item}.currentStatus`}
                    label="Current status"
                    component={this.renderTextAreaField}
                    rows={3}
                  />
                </Col>
                <Col span={11}>
                  <Field
                    name={`${item}.successCriteria`}
                    label="Success criteria"
                    component={this.renderTextAreaField}
                    rows={3}
                  />
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
            <Button type="primary" onClick={() => fields.push({n: fields.length + 1})}>
              Add item
            </Button>
            {submitFailed && error && <span>{error}</span>}
          </div>
        </div>
    )
  }

  renderActualWorkstreams = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div>
          {fields.map((item, index) => (
            <div key={index} className="p-l-25 p-r-25 mg-b-20">
              <Row gutter={8}>
                <Col span={12}>
                  {/* #{index+1} */}
                </Col>
                <Col span={12} className="text-right">
                  <a>
                    <IconIoMdClose
                      onClick={() => fields.remove(index)}
                    />
                  </a>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={2}>
                  <Field
                    name={`${item}.n`}
                    component={this.renderInputField}
                    label="#"
                  />
                </Col>
                <Col span={22}>
                  <Field
                    name={`${item}.title`}
                    label="Title"
                    component={this.renderInputField}
                  />
                  <Field
                    name={`${item}.tasks`}
                    label="Tasks"
                    component={this.renderTextAreaField}
                    rows={3}
                  />                
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
            <Button type="primary" onClick={() => fields.push({n: fields.length + 1})}>
              Add item
            </Button>
            {submitFailed && error && <span>{error}</span>}
          </div>
        </div>
    )
  }  

  renderAttendeesInLab = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div>
          {fields.map((item, index) => (
            <div key={index} className="p-l-25 p-r-25 mg-b-20">
              <Row gutter={8}>
                <Col span={12}>
                  #{index+1}
                </Col>
                <Col span={12} className="text-right">
                  <a>
                    <IconIoMdClose
                      onClick={() => fields.remove(index)}
                    />
                  </a>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={3}>
                  <Field
                    name={`${item}.isInLab`}
                    component={this.renderInputField}
                    label="In lab/virtually"
                  />
                </Col>
                <Col span={6}>
                  <Field
                    name={`${item}.name`}
                    component={this.renderInputField}
                    label="Name"
                  />
                </Col>
                
                <Col span={6}>
                  <Field
                    name={`${item}.email`}
                    component={this.renderInputField}
                    label="Email"
                  />                
                </Col>
                <Col span={6}>
                  <Field
                    name={`${item}.roleResponsibility`}
                    component={this.renderInputField}
                    label="Role/Responsibility"
                  />
                </Col>
                <Col span={3}>
                  <Field
                    name={`${item}.workstreamN`}
                    component={this.renderInputField}
                    label="Workstream #"
                  />
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
            <Button type="primary" onClick={() => fields.push({})}>
              Add attendee
            </Button>
            {submitFailed && error && <span>{error}</span>}
          </div>
        </div>
    )
  }

  renderUsedMsTechnology = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div>
          {fields.map((item, index) => (
            <div key={index} className="p-l-25 p-r-25 mg-b-20">
              <Row gutter={8}>
                <Col span={12}>
                  #{index+1}
                </Col>
                <Col span={12} className="text-right">
                  <a>
                    <IconIoMdClose
                      onClick={() => fields.remove(index)}
                    />
                  </a>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Field
                    name={`${item}.productId`}
                    component={this.renderSelectField}
                    label="Product"
                    data={this.props.msftProducts}
                    titleProperty="name"
                    valueProperty="id"
                    allowClear={false}
                    showSearch={true}
                    filterOption={(input, option) => {
                        let searchValues = input.toLowerCase().trim().split(" ")
                        let count = 0;
                        for(let i =0; i<searchValues.length; i++) {
                          if (option.props.title.toLowerCase().indexOf(searchValues[i]) >= 0) {
                            ++count
                          }
                        }
                        return searchValues.length == count
                      }
                    }
                    optionRender={(item) => {
                      // console.warn(item)
                      return <MsftProductItem data={item}/>
                    }}
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name={`${item}.rating`}
                    component={this.renderRateField}
                    label="Rating"
                    defaultValue={0}
                  />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Field
                    name={`${item}.productFeedback`}
                    component={this.renderTextAreaField}
                    label="Feedback notes"
                    rows={3}
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name={`${item}.productBugs`}
                    component={this.renderTextAreaField}
                    label="Bugs notes"
                    rows={3}
                  />
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
          <Button type="primary" onClick={() => fields.push({})}>
            Add product
          </Button>
          {submitFailed && error && <span>{error}</span>}
          </div>
        </div>
    )
  }

  renderUsedNonMsTechnology = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div>
          {fields.map((item, index) => (
            <div key={index} className="p-l-25 p-r-25 mg-b-20">
              <Row gutter={8}>
                <Col span={1}>
                  #{index+1}
                </Col>
                <Col span={22}>
                  <Field
                    name={`${item}.productName`}
                    component={this.renderInputField}
                    label="Product"
                  />
                </Col>
                <Col span={1} className="text-right">
                  <a>
                    <IconIoMdClose
                      onClick={() => fields.remove(index)}
                    />
                  </a>
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
            <Button type="primary" onClick={() => fields.push({})}>
              Add product
            </Button>
            {submitFailed && error && <span>{error}</span>}
          </div>
        </div>
    )
  }  

  renderFutureSprintRecommendations = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div>
          {fields.map((item, index) => (
            <div key={index} className="p-l-25 p-r-25 mg-b-20">
              <Row gutter={8}>
                <Col span={12}>
                  {/* #{index+1} */}
                </Col>
                <Col span={12} className="text-right">
                  <a>
                    <IconIoMdClose
                      onClick={() => fields.remove(index)}
                    />
                  </a>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={2}>
                  <Field
                    name={`${item}.n`}
                    component={this.renderInputField}
                    label="#"
                  />
                </Col>
                <Col span={22}>
                  <Field
                    name={`${item}.task`}
                    label="Task"
                    component={this.renderInputField}
                  />                
                  <Field
                    name={`${item}.description`}
                    label="Description"
                    component={this.renderTextAreaField}
                    rows={3}
                  />
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
            <Button type="primary" onClick={() => fields.push({n: fields.length + 1})}>
              Add item
            </Button>
            {submitFailed && error && <span>{error}</span>}
          </div>
        </div>
    )
  }  

  render() {
    const { handleSubmit, submitting, invalid, submitFailed} = this.props

    return (
      <>
        <form>
          <div>
            <div className="pull-left">
              {
                this.props.company
                ? <h1>{this.props.company ? this.props.company.name : ''}</h1>
                : ''
              }
              <div className="form-group">
                <Field 
                  name="engagementDates"
                  label="Engagement dates"
                  component={this.renderDateRangeField}
                  required={true}
                  validate={[validationConstraints.required]}
                  allowClear={false}
                />
              </div>
            </div>
            <div className="pull-right">
              <h1><SprintNumberName number={this.props.engagementSprintN} questionReplace={true} /></h1>
            </div>
            <div className="clearfix"/>
          </div>

          <div className="mg-t-20">
            <h2>Company brief</h2>
            <div dangerouslySetInnerHTML={{ __html: this.props.companyBrief ? this.props.companyBrief.replace(/\n/g, "<br />") : ''}}/>
          </div>

          <div className="mg-t-20 mg-b-20">
            <h2>Project brief</h2>
            <div dangerouslySetInnerHTML={{ __html: this.props.projectBrief ? this.props.projectBrief.replace(/\n/g, "<br />") : ''}}/>
          </div>
          
          <div className="form-group">
            <label>Used Microsoft technology</label>
            <FieldArray 
              name="usedTechnology.msft"
              component={this.renderUsedMsTechnology}
            />
          </div>
          <div className="form-group">
            <label>Used Non Microsoft technology</label>
            <FieldArray 
              name="usedTechnology.nonMsft"
              component={this.renderUsedNonMsTechnology}
            />
          </div>
          <div className="form-group">
            <label>Attendees in Lab</label>
            <FieldArray 
              name="attendeesInLab"
              component={this.renderAttendeesInLab}
            />
          </div>

          <Field 
            className="form-group"
            name="preconditionPreparation"
            label="Precondition/Preparation"
            component={this.renderTextAreaField}
            rows={3}
          />

          <div className="form-group">
            <Field 
              name="sprint.notes"
              label="Sprint notes"
              component={this.renderTextAreaField}
              rows={3}
            />
            <div>
              <label>Sprint target workstreams</label>
            </div>
            <FieldArray 
              name="sprint.targetWorkstreams"
              component={this.renderTargetWorkstreams}
            />
            <div>
              <label>Sprint actual workstreams</label>
            </div>
            <FieldArray 
              name="sprint.actualWorkstreams"
              component={this.renderActualWorkstreams}
            />
          </div>

          <Field 
            className="form-group"
            name="outcome"
            label="Outcome"
            component={this.renderTextAreaField}
            rows={3}
          />

          <div className="form-group">
            <label>Acceleration score</label>
            <Row gutter={8}>
              <Col span={8}>
                <Field 
                  name="accelerationScore.weeksInLab"
                  label="Weeks in Lab"
                  component={this.renderInputField}
                />
              </Col>
              <Col span={8}>
                <Field 
                  name="accelerationScore.weeksIfThemselves"
                  label="Weeks if do themselves"
                  component={this.renderInputField}
                />
              </Col>
              <Col span={8}>
                <Field 
                  name="accelerationScore.accelerationScore"
                  label="Acceleration Score"
                  component={this.renderInputField}
                />
              </Col>
            </Row>            
          </div>

          <div className="form-group">
            <label>Retrospective</label>
            <Row gutter={8}>
              <Col span={12}>
                <Field 
                  name="retrospective.like"
                  label="Likes"
                  component={this.renderTextAreaField}
                  rows={3}
                />
              </Col>
              <Col span={12}>
                <Field 
                  name="retrospective.lacking"
                  label="Lacking"
                  component={this.renderTextAreaField}
                  rows={3}
                />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Field 
                  name="retrospective.learned"
                  label="Learned"
                  component={this.renderTextAreaField}
                  rows={3}
                />
              </Col>
              <Col span={12}>
                <Field 
                  name="retrospective.next"
                  label="Next"
                  component={this.renderTextAreaField}
                  rows={3}
                />
              </Col>
            </Row>            
          </div>

          <div className="form-group">
            <div>
                <label>Future sprint recommendations</label>
            </div>
            <FieldArray 
              name="futureSprintRecommendations"
              component={this.renderFutureSprintRecommendations}
            />
          </div>

          <div className="form-default-action-btn">
            <FormLevelErrorPlaceholder show={invalid && submitFailed}/>
            <Button type="primary" 
              loading={this.state.saveProcessingLoading}
              onClick={handleSubmit(values => {
                  this.setState({
                    saveProcessingLoading: true
                  })
                  return this.props.onSubmit(values)
                  .catch( () => {
                    this.setState({
                      saveProcessingLoading: false
                    })
                  })
              })}
            >Save</Button>
            <Button onClick={()=>this.props.onClose()}>Cancel</Button>
          </div>
        </form>
      </>
    )
  }
}


NominationWriteupCreateEditForm = reduxForm({
  form: NOMINATION_WRITEUP_CREATE_EDIT_FORM_ID,
  enableReinitialize: true
})(NominationWriteupCreateEditForm);


const mapStateToProps = (state) => {
  return {
    msftProducts: Object.values(state.rootApp.msftProducts)
  }
}

export default connect(mapStateToProps)(NominationWriteupCreateEditForm)