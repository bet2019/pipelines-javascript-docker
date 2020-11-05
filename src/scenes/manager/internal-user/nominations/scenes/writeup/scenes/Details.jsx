import React from 'react'
import { nominationWriteupActions } from '../nominationWriteupDucks';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import {connect} from 'react-redux'
import permissionAbility, {Can} from 'src/_helpers/permission';
import PageTitle from 'src/_components/PageTitle';
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import {IoMdCheckmark as IconIoMdCheckmark} from 'react-icons/io'
import Card from 'antd/lib/card'
import Rate from 'antd/lib/rate'
import Routing, { routesUI } from 'src/_helpers/routing';
import MsftProductItem from 'src/_components/MsftProductItem';
import SprintNumberName from '../../components/SprintNumberName';
import config from 'src/config';
import DateRangeFormatter from 'src/_components/DateRangeFormatter';
import NotAuthorized_403 from 'src/_components/errors/NotAuthorized_403';

class NominationWriteupDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      writeupData: null
    }
  }

  componentDidMount() {
    return this.fetchData()
  }

  fetchData() {
    const {nominationId, writeupId} = this.props.match.params
    return this.props.dispatch(nominationWriteupActions.get(nominationId, writeupId))
    .then( res => {
      this.setState({
        writeupData: res.data
      })
    })
  }  

  noneBlock = () => {
    return (
      <div className="text-center">None</div>
    )
  }

  renderUsedTech() {
    let d = this.state.writeupData.data
    return (
      <div className="writeup-section">
        <h2>Used technology</h2>
        {
          d.usedTechnology
          ? <>
            <div>
              <h3>Microsoft technology</h3>
              {
                (!d.usedTechnology.msft || d.usedTechnology.msft.length === 0)
                ? this.noneBlock()
                : (
                  d.usedTechnology.msft.map( (item, idx) => {
                    return (
                      <Row key={idx} className="mg-b-20">
                        <Col span={12} offset={6}>
                          <Row gutter={8}>
                            <Col span={1}>#{idx+1}</Col>
                            <Col span={12}> 
                              <MsftProductItem 
                                data={this.props.msftProducts[item.productId]}
                                url={true}
                              />
                            </Col>
                            <Col span={11} className="text-right"><Rate value={item.rating} disabled={true}/></Col>
                          </Row>
                          <Row gutter={8}>
                            <Col span={1}></Col>
                            <Col span={23}>
                            {
                              item.productFeedback
                              ? <>
                                  <strong>Feedback</strong>
                                  <div dangerouslySetInnerHTML={{ __html: item.productFeedback.replace(/\n/g, "<br />")}}/>
                                </>
                              : ''
                            }
                            
                            {
                              item.productBugs
                              ? <>
                                  <strong>Bugs</strong>
                                  <div dangerouslySetInnerHTML={{ __html: item.productBugs.replace(/\n/g, "<br />")}}/>
                                </>
                              : ''
                            }
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })
                )
              }
            </div>
            <div>
              <h3>Non Microsoft technology</h3>
              {
                (!d.usedTechnology.nonMsft || d.usedTechnology.nonMsft.length === 0)
                ? this.noneBlock()
                : (
                  d.usedTechnology.nonMsft.map( (item, idx) => {
                    return (
                      <Row key={idx}>
                        <Col span={12} offset={6}>
                          <Row gutter={8}>
                            <Col span={1}>#{idx+1}</Col>
                            <Col span={23}>{item.productName}</Col>
                          </Row>
                        </Col>                    
                      </Row>
                    )
                  })
                )
              }
            </div>
            </>
          : this.noneBlock()
        }
        
      </div>
    )
  }

  renderAttendeesInLab() {
    let d = this.state.writeupData.data

    return (
      <div className="writeup-section">
        <h2>Attendees in Lab</h2>
        {
          !d.attendeesInLab || d.attendeesInLab.length === 0
          ? this.noneBlock()
          : <Table 
              rowKey={(record, idx)=>`attendee-${idx}`}
              columns={[
                { title: 'In lab / virtually', dataIndex: 'isInLab', width: '10%'},
                { title: 'Name', dataIndex: 'name'},
                { title: 'Email', dataIndex: 'email'},
                { title: 'Role/Responsibility', dataIndex: 'roleResponsibility'},
                { title: 'Workstream #', dataIndex: 'workstreamN', width: '10%'},
              ]} 
              dataSource={d.attendeesInLab} 
              pagination={false}
            />
        }
      </div>
    )
  }

  renderSprint() {
    let d = this.state.writeupData.data

    return (
      <div className="writeup-section">
        <h2>Sprint</h2>
        
        {
          d.sprint && d.sprint.notes 
          ? <div dangerouslySetInnerHTML={{ __html: d.sprint.notes.replace(/\n/g, "<br />")}}/>
          : ''
        }

        <div className="mg-t-20">
          <h3>Sprint target workstreams</h3>
          &nbsp;
          {
            !d.sprint || !d.sprint.targetWorkstreams || d.sprint.targetWorkstreams.length === 0
            ? this.noneBlock()
            : <Table 
                rowKey={(record, idx)=>`target-${idx}`}
                columns={[
                  { title: '#', dataIndex: 'n', width: '4%'},
                  { title: 'Done?', dataIndex: 'isCompleted', width: '7%', render: (text, record) => record.isCompleted ? <IconIoMdCheckmark/>: ''},
                  { title: 'Task', dataIndex: 'task',
                    render: (text, record) => <div dangerouslySetInnerHTML={{ __html: record.task ? record.task.replace(/\n/g, "<br />") : ''}}/>},
                  { title: 'Description', dataIndex: 'description'},
                  { title: 'Current status', dataIndex: 'currentStatus'},
                  { title: 'Success criteria', dataIndex: 'successCriteria'},
                ]} 
                dataSource={d.sprint.targetWorkstreams} 
                pagination={false}
              />
          }
        </div>

        <div className="mg-t-20">
          <h3>Sprint actual workstreams</h3>
          &nbsp;
          {
            !d.sprint || !d.sprint.actualWorkstreams || d.sprint.actualWorkstreams.length === 0
            ? this.noneBlock()
            : <Table 
                rowKey={(record, idx)=>`actual-${idx}`}
                columns={[
                  { title: '#', dataIndex: 'n', width: '4%'},
                  { title: 'Title/Tasks',  render: (text, record) => (
                    <>
                      <div>{record.title}</div>
                      {
                        record.tasks
                        ? <div dangerouslySetInnerHTML={{ __html: record.tasks.replace(/\n/g, "<br />")}}/>
                        : ''
                      }
                      
                    </>
                  )},
                ]} 
                dataSource={d.sprint.actualWorkstreams} 
                pagination={false}
              />
          }   
        </div>     
      </div>
    )
  }

  renderRetrospective() {
    let d = this.state.writeupData.data
    return (
      <div className="writeup-section">
        <h2>Retrospective</h2>
        {
          !d.retrospective
          ? this.noneBlock()
          : <>
          <Row gutter={8}>
            <Col span={12}>
              {
                d.retrospective.like
                ? <Card title={<strong>Liked</strong>}>
                    <div dangerouslySetInnerHTML={{ __html: d.retrospective.like.replace(/\n/g, "<br />")}}/>
                  </Card>
                : ''
              }
            </Col>
            <Col span={12}>
              {
                d.retrospective.lacking 
                ? <Card title={<strong>Lacking</strong>}>
                    <div dangerouslySetInnerHTML={{ __html: d.retrospective.lacking.replace(/\n/g, "<br />")}}/>
                  </Card>
                : ''
              }
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              {
                d.retrospective.learned
                ? <Card title={<strong>Learned</strong>}>
                    <div dangerouslySetInnerHTML={{ __html: d.retrospective.learned.replace(/\n/g, "<br />")}}/>
                  </Card>
                : ''
              }
            </Col>
            <Col span={12}>
              {
                d.retrospective.next
                ? <Card title={<strong>Next</strong>}>
                    <div dangerouslySetInnerHTML={{ __html: d.retrospective.next.replace(/\n/g, "<br />")}}/>
                  </Card>
                : ''
              }
            </Col>
          </Row>
          </>
        }
      </div>
    )
  }

  renderFutureSprintRecommendations() {
    let d = this.state.writeupData.data
    return (
      <div className="writeup-section">
        <h2>Future sprint recommendations</h2>
        {
          !d.futureSprintRecommendations || d.futureSprintRecommendations.length === 0
          ? this.noneBlock()
          : <Table 
              rowKey={(record, idx)=>`actual-${idx}`}
              columns={[
                { title: '#', dataIndex: 'n', width: '4%'},
                { title: 'Task/Description',  render: (text, record) => (
                  <>
                    <div>{record.task}</div>
                    {
                      record.description
                      ? <div dangerouslySetInnerHTML={{ __html: record.description.replace(/\n/g, "<br />")}}/>
                      : ''
                    }
                    
                  </>)},
              ]} 
              dataSource={d.futureSprintRecommendations} 
              pagination={false}
            />
        }
      </div>
    )
  }

  render() {
    if (!this.state.writeupData) {
      return <LogoLoadingSpinner />
    }


    let writeup = this.state.writeupData
    let d = writeup.data

    let companyName = writeup.nomination && writeup.nomination.company ? writeup.nomination.company.name : ''

    return (
      <PageTitle title="Writeup" subTitle={`${companyName} Sprint ${writeup.nomination.engagementSprintN || '???'}`}>
        <div>
        {
          permissionAbility.can('do','acl:nominations::writeups/manage') || permissionAbility.can('do','acl:nominations::writeups/view')
          ? <>
          <section className="writeup">
            <div className="mg-t-20">
              <Row gutter={8} className="mg-b-20">
                <Col span={12}>
                  <h1>{companyName}</h1>
                  <div className="writeup-section">
                    <h2>
                      Engagement dates
                      &nbsp;
                      {
                        (d.engagementDates.length === 0)
                        ? this.noneBlock()
                        : <span className="text-strong">
                            <DateRangeFormatter 
                              date1={d.engagementDates[0]}
                              date2={d.engagementDates[1]}
                              format={config.dateFormatMMMDYYYY}
                            />
                          </span>
                      }
                    </h2>
                  </div>
                </Col>
                <Col span={12} className="text-right">
                  <div>
                    {
                      writeup.nomination
                      ? <h1><SprintNumberName number={writeup.nomination.engagementSprintN} questionReplace={true} /></h1>
                      : ''
                    }
                  </div>

                  <Can I="do" a="acl:nominations::writeups/view">
                    <Button type="primary"
                      onClick={()=>this.props.history.push(Routing.generate(routesUI.internalUser.nominations.view, {
                        nominationId: this.state.writeupData.nominationUuid,
                      }))}
                    >
                      Go to nomination
                    </Button>
                  </Can>
                  
                  &nbsp;

                  <Can I="do" a="acl:nominations::writeups/manage">
                    <Button type="primary"
                      onClick={()=>this.props.history.push(Routing.generate(routesUI.internalUser.nominations.writeups.edit, {
                        nominationId: this.state.writeupData.nominationUuid,
                        writeupId: this.state.writeupData.uuid
                      }))}
                    >
                      Edit
                    </Button>
                  </Can>
                </Col>
              </Row>
              
              <div>
                <h2>Company brief</h2>
                <div dangerouslySetInnerHTML={{ __html: writeup.nomination.company && writeup.nomination.company.companyBrief ? writeup.nomination.company.companyBrief.replace(/\n/g, "<br />") : ''}}/>
              </div>
              
              <div>
                <h2>Project brief</h2>
                <div dangerouslySetInnerHTML={{ __html: this.state.writeupData && this.state.writeupData.nomination && this.state.writeupData.nomination.projectBrief ? this.state.writeupData.nomination.projectBrief.replace(/\n/g, "<br />") : ''}}/>
              </div>
              

              {this.renderUsedTech()}
              {this.renderAttendeesInLab()}

              <div className="writeup-section">
                <h2>Precondition/Preparation</h2>
                &nbsp;
                { 
                  !d.preconditionPreparation || d.preconditionPreparation.length === 0 
                  ? this.noneBlock() 
                  : <div dangerouslySetInnerHTML={{ __html: d.preconditionPreparation.replace(/\n/g, "<br />")}}/>
                }
              </div>

              {this.renderSprint()}

              <div className="writeup-section">
                <h2>Outcome</h2>
                <br/>
                {
                  d.outcome
                  ? <div dangerouslySetInnerHTML={{ __html: d.outcome.replace(/\n/g, "<br />")}}/>
                  : ''
                }
              </div>

              <div className="writeup-section">
                <h2>Acceleration score</h2>
                {
                  !d.accelerationScore
                  ? this.noneBlock()
                  : <div>
                      <div>Weeks in Lab: {d.accelerationScore.weeksInLab || ''}</div>
                      <div>Weeks if do themselves: {d.accelerationScore.weeksIfThemselves || ''}</div>
                      <div>Acceleration score: {d.accelerationScore.accelerationScore || ''}</div>
                    </div>
                }              
              </div>

              {this.renderRetrospective()}
              {this.renderFutureSprintRecommendations()}
            </div>
          </section>
        </>
        : <NotAuthorized_403 />
        }
        </div>
      </PageTitle>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    msftProducts: state.rootApp.msftProducts
  }
}

export default connect(mapStateToProps)(NominationWriteupDetails)