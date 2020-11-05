import React from 'react'

import { Can } from 'src/_helpers/permission';
import PageTitle from 'src/_components/PageTitle';

import calendarService from '../calendarService';
import { hot } from "react-hot-loader/root";

import Timeline, {
  TimelineMarkers,
  TodayMarker,
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import '../style/react-calendar.less'

import moment from 'moment';
import config from 'src/config';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import PopoverNominationCard from 'src/_components/nomination/PopoverNominationCard';
import SprintNumberName from '../../nominations/scenes/components/SprintNumberName';
import HelpPixel from 'src/_components/helpPixel';
import Avatar from 'src/_components/user/Avatar';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

class NominationEventsCalendar extends React.Component {

  constructor(props) {
    super(props)

    this.todayTimeStart = moment().startOf("day").add(-5, 'day').valueOf()
    this.todayTimeEnd = moment().startOf("day").add(+30, 'day').valueOf()


    this.state = {
      calendarEvents: [],
      visibleTimeStart: this.todayTimeStart,
      visibleTimeEnd: this.todayTimeEnd,
      yearLeftRange: moment().startOf("day").add(-270, 'day'),
      yearRightRange: moment().startOf("day").add(90, 'day'),
      isLoading: false,
    }
  }

  componentDidMount() {
    return this.refetchEvents()
  }

  refetchEvents = () => {
    return this.fetchEvents({startStr: this.state.yearLeftRange.format('YYYY-MM-DD'), endStr: this.state.yearRightRange.format('YYYY-MM-DD')})
  }

  fetchEvents = ( info, onSuccess, onFailure) => {
    this.setState({isLoading: true})
    return calendarService.loadNominationsEvents({
      start: moment(info.startStr).format(config.dateFormat),
      end:  moment(info.endStr).format(config.dateFormat)
    })
    .then( res => {
      res.data.map( i => {
        i.end = moment(i.end).add(1,'day').format(config.dateFormat) // to make calendar include the date
        i.start_time = moment(i.start).valueOf()
        i.end_time = moment(i.end).valueOf()
        i.itemProps =  {
          className: i.engagementCompleted ? 'engagement-completed' : (i.engagementDatesConfirmed ? 'engagement-dates-confirmed' : '')
        }
      })
      this.setState({
        calendarEvents: res.data,
      })
      return res.data
    })
    .finally(()=>{
      this.setState({
        isLoading: false
      })
    })
  }

  // };

  onCtrlToday = () => {
    this.setState(state => ({
      visibleTimeStart: this.todayTimeStart,
      visibleTimeEnd: this.todayTimeEnd,
      // scrolling: false
    }), ()=>{
      // return this.fetchEvents({startStr: this.state.visibleTimeStart, endStr: this.state.visibleTimeEnd})
    });
  };


  render() {
    return (
      <PageTitle title="Nominations Schedule">
        <Can I="do" a="acl:nominations/manage">
          <div className="mg-t-20">
            <div className="react-calendar-disable-overflow-x" data-grid="col-12">

              <div className="mg-b-10">
              {/* <Form
                onSubmit={ () => {} }
                // initialValues={this.props.initialValues||undefined}
                render={() => {
                  return (
                  <form >
                    <FormSpy
                      subscription={{ values: true}}
                      onChange={ formState => {
                        console.warn(formState)
                        // props.onChange(formState.values)
                      }}
                    />
                    <Field 
                      component={FormMonthRangePicker}
                      name="period"
                    />
                  </form>
                )}}
              /> */}
                <div>
                  <Row gutter={16}>
                    <Col span={8}>
                      <HelpPixel 
                        position="append"
                        topic={
                          <ul>
                            <li>
                              Period: {this.state.yearLeftRange.format('YYYY-MM-DD')} - {this.state.yearRightRange.format('YYYY-MM-DD')}
                            </li>
                            <li>
                              Drag the timeline to scroll between days
                            </li>
                            <li>
                              Click at event for details
                            </li>
                          </ul>
                        }
                      />
                    </Col>
                    <Col span={8}>
                        <ul className="">
                          <li>
                            <span className="timeline-colors-description engagement-dates-not-confirmed" style={{paddingLeft: "20px"}}></span>&nbsp;- planned, dates <strong>not</strong> confirmed
                          </li>
                          <li>
                            <span className="timeline-colors-description engagement-dates-confirmed" style={{paddingLeft: "20px"}}></span>&nbsp;- planned, dates <strong>are</strong> confirmed
                          </li>
                          <li>
                            <span className="timeline-colors-description engagement-completed" style={{paddingLeft: "20px"}}></span>&nbsp;- engagement completed
                          </li>
                        </ul>
                    </Col>
                    <Col span={8}  className="text-right">
                      <div>
                        <Button 
                          type="primary"
                          onClick={this.onCtrlToday} 
                          disabled={
                            !(this.state.visibleTimeStart > moment().valueOf()
                              || this.state.visibleTimeEnd < moment().valueOf())
                          }
                        >Focus on Today</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
          
              <Timeline
                groups={this.props.labResources}
                items={this.state.calendarEvents}
                lineHeight={60}
                itemHeightRatio={0.8}
                minZoom={3600 * 24 * 36 * 1000}
                maxZoom={3600 * 24 * 36 * 1000}
                dragSnap={3600 * 24 * 36 * 1000}
                stackItems
                itemTouchSendsClick={false}
                canMove={false}
                canResize={false}
                traditionalZoom={false}
                visibleTimeStart={this.state.visibleTimeStart}
                visibleTimeEnd={this.state.visibleTimeEnd}
                itemRenderer={ ({
                  item,
                  itemContext,
                  getItemProps,
                  getResizeProps
                }) => {
                  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
                  let itemProps = {...getItemProps(item.itemProps)}
                  itemProps.title = `${itemContext.title} (Sprint ${item.engagementSprintN? item.engagementSprintN : '???'})`
                  itemProps.style.lineHeight = "25px"
                  itemProps.style.height = "50px"
                  itemProps.style.whiteSpace = "nowrap"
                  itemProps.style.overflow = "hidden"
                  return (
                    <PopoverNominationCard
                      nominationId={item.id}
                      onUpdate={this.refetchEvents}
                    >
                      <div {...itemProps}>
                        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}
                  
                        <div
                          className="rct-item-content"
                          style={{ maxHeight: `${itemContext.dimensions.height}` }}
                        >
                          <div>
                            {itemContext.title} (<SprintNumberName number={item.engagementSprintN} questionReplace={true}/>)
                          </div>
                          <div>
                            {
                              item.engagementAssignedToUsers
                              ? item.engagementAssignedToUsers.map(i => {
                                  let {uuid, fullName, email} = i
                                  return (
                                    <Avatar
                                      key={uuid}
                                      className="pull-left mg-r-3"
                                      size="1.3rem"
                                      user={{
                                        uuid,
                                        fullName,
                                        email
                                      }}
                                    />
                                  )
                                })
                              :''
                            }
                          </div>
                        </div>
                  
                        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
                      </div>
                    </PopoverNominationCard>
                  )}
                
                }
                onTimeChange={(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
                  let minTime = this.state.yearLeftRange.valueOf()
                  let maxTime = this.state.yearRightRange.valueOf()
                  if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
                    updateScrollCanvas(minTime, maxTime)
                  } else if (visibleTimeStart < minTime) {
                    updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
                  } else if (visibleTimeEnd > maxTime) {
                    updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
                  } else {
                    updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
                  }
                  this.setState({
                    visibleTimeStart,
                    visibleTimeEnd,
                  });
                }}
              >
                <TimelineMarkers>
                  <TodayMarker>
                    {({ styles, date }) => {
                      let st = {...styles, 
                        backgroundColor: 'red',
                        width: "3px"
                      }
                        return <div style={st} />
                      }
                    }
                  </TodayMarker>
                </TimelineMarkers>
                <TimelineHeaders>
                  <SidebarHeader>
                    {({ getRootProps }) => {
                      return <div {...getRootProps()} className="sidebar-header">
                        {/* Labs */}
                      </div>
                    }}
                  </SidebarHeader>
                  <DateHeader unit="primaryHeader" />

      
                  <DateHeader
                    className="date-header"
                    unit="day"
                    labelFormat="ddd"
                    intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                      let props = {...getIntervalProps()}
                      return <div {...props}>
                        {intervalContext.intervalText}
                      </div>
                    }}
                  />
                  
                  <DateHeader
                    className="date-header"
                    unit="day"
                    labelFormat="D"
                    intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                      let props = {...getIntervalProps()}
                      return <div {...props}>
                        {intervalContext.intervalText}
                      </div>
                    }}
                  />
                </TimelineHeaders>
              </Timeline>
            </div>
          </div>
        </Can>
      </PageTitle>
    )
  }
}

const mapStateToProps = state => {
  return {
    labResources: state.rootApp.labs.map(i => {return {id: i.id, title: i.name}}),
  }
}

export default hot(connect(mapStateToProps)(NominationEventsCalendar))