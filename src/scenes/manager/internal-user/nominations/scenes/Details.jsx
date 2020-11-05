import React from 'react';
import { nominationActions } from '../nominationDucks';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import { connect } from "react-redux";
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageTitle from 'src/_components/PageTitle';
import Routing, { routesUI } from 'src/_helpers/routing';
import permissionAbility, { Can } from 'src/_helpers/permission';
import NominationSubmittedDetails from './components/NominationSubmittedDetails';
import Tabs from 'antd/lib/tabs';
import NominationCompanyInfo from './components/NominationCompanyInfo';
import NominationOverviewDetails from './components/NominationOverviewDetails';
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import config from 'src/config';
import SprintNumberName from './components/SprintNumberName';
import Popconfirm from 'antd/lib/popconfirm';
import {IoMdCopy as IconIoMdCopy} from 'react-icons/io'
import NominationTestimonial from './components/NominationTestimonial';

class NominationDetails extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    return this.fetchData()
  }

  fetchData = () => {
    return this.props.dispatch(nominationActions.get(this.props.match.params.nominationId))
    .then( res => {
      this.setState({
        data: res.data
      })
    })
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.match.params.nominationId != nextProps.match.params.nominationId) {
      await this.setState({
        data: null
      })
      return this.fetchData()
    }
  }

  onConfirmDelete = (id) => {
    return this.props.dispatch(nominationActions.remove(id))
    .then(res=>{
      if (this.state.data.statusId == config.nominationStatuses.deleted.id) {
        return this.props.history.replace(Routing.generate('routes.ui.internalUser.nominations._self'))
      } else {
        return this.fetchData()
      }
    })
  }

  onDuplicateNomination = () => {
    return this.props.dispatch(nominationActions.duplicate(this.state.data.uuid))
    .then(res=>{
      return this.props.history.push(Routing.generate(routesUI.internalUser.nominations.view, {
        nominationId: res.data.uuid
      }))
    })
  }

  renderTabsPane() {
    let item = this.state.data
    let company = item.company

    return (
      <div className="mg-t-20">
        <NominationCompanyInfo 
          company={item.company}
          history={this.props.history}
        />

        <Row  className="mg-t-20">
          <Col span={24}>
            <div className="pull-left">
              <h1>Nomination</h1>
            </div>
            <div className="pull-left h1-action-links">
              <Can I="do" a="acl:nominations/manage">
                <ActionButtonsGroup 
                  itemId={item.uuid}
                  onEdit={()=>this.props.history.push(Routing.generate('routes.ui.internalUser.nominations.edit', {nominationId: item.uuid}))}
                  onDelete={()=>this.onConfirmDelete(item.uuid)}
                  extraElements={[
                    {
                      component: (<a
                          className="text-muted"
                        >
                          <Popconfirm title={<>
                            The nomination will be duplicated.
                            <br/>Only basic information will be copied.
                            <br/>Excluding: 
                            <br/>
                            <ul>
                              <li>- nomination sprint number</li>
                              <li>- sprint planned dates</li>
                              <li>- status</li>
                            </ul>
                            </>}
                            onConfirm={() => this.onDuplicateNomination()}
                          >
                            <IconIoMdCopy/>
                          </Popconfirm>
                        </a>
                      )
                    }
                  ]}
                />
              </Can>
            </div>
            <div className="pull-right">
              {
                item.engagementSprintN || item.engagementSprintN == 0 || item.writeup
                ? <h1><SprintNumberName number={item.engagementSprintN} questionReplace={true}/></h1>
                : ''
              }
            </div>
            <div className="clearfix"/>
            <Can I="do" a="acl:nominations/manage">
              <div>
                <span className="nomination-blue-background-explanation" /> - Those are the fields visible to customer
              </div>
            </Can>
          </Col>
        </Row>

        <Tabs>
          <Tabs.TabPane key={1} tab="Overview">
            <NominationOverviewDetails 
              nominationDataDetails={item}
              fetchData={this.fetchData}
            />
          </Tabs.TabPane>
          {
            permissionAbility.can('do', 'acl:nominations/manage') || permissionAbility.can('do', 'acl:nominations/view/general_info/extra_details') 
            ? <Tabs.TabPane key={2} tab="Submitted details">
                <NominationSubmittedDetails
                  item={item}
                  company={company}              
                />
              </Tabs.TabPane>
            : ''
          }
          {
            permissionAbility.can('do', 'acl:nominations/manage') || permissionAbility.can('do', 'acl:/nominations/view/general_info/extra_details')
            ? <Tabs.TabPane key={3} tab={`Testimonials (${item.testimonialTotalCount || 0})`}>
                <NominationTestimonial nominationId={this.props.match.params.nominationId} fetchNominationData={this.fetchData}/>
              </Tabs.TabPane>
            : ''
          }
        </Tabs>
      </div>
    )
  }

  render() {
    return (
      <PageTitle title="Nomination" >
        <Can I="do" a="acl:nominations/view/general_info">
          {
            this.state.data
            ? this.renderTabsPane()
            : <LogoLoadingSpinner/>
          }
        </Can>
      </PageTitle>
    )
  }
}

export default connect()(NominationDetails)