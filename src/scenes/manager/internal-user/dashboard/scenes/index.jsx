import React from 'react'
import PageTitle from 'src/_components/PageTitle';
import api from 'src/_helpers/api';
import {Link} from 'react-router-dom'
import Routing, { routes, routesUI } from 'src/_helpers/routing';
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Card from 'antd/lib/card'
import {connect} from 'react-redux'
import urlHelper from 'src/_helpers/urlHelper';
import {Can} from 'src/_helpers/permission';
import Alert from 'src/_components/pageElements/Alert';
import NominationRequireAttentionReport from 'src/scenes/manager/internal-user/dashboard/components/NominationRequireAttentionReport';

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nomination_overview_status: []
    }
  }
  componentDidMount() {
    api.get(routes.api.internal.reports.nomination_overview_status)
    .then( res => {
      this.setState({
        nomination_overview_status: res.data
      })
    })
  }

  renderNominationOverviewStatus(){
    return this.state.nomination_overview_status.map(item => {
      return (
        <Col key={item.labId} span={8} className="mg-t-10 mg-b-10">
          <Card title={item.labName} bordered={false}>
            <dl className="dl-horizontal">
            {
              Object.keys(item.status).map( key => {
                return (
                  <span key={item.labId+key}>
                  <dt>{this.props.nominationStatuses[key].name}</dt>
                  <dd className="text-right">
                    {
                      item.labId === 0
                      ? item.status[key]
                      : <Link to={
                            Routing.generate(routesUI.internalUser.nominations.list)
                            + '?' + urlHelper.objToQueryString({
                              filters: {
                                statusId: key,
                                labId: item.labId
                              }
                            })
                          }>
                          {item.status[key]}
                        </Link>
                    }
                    
                  </dd>
                  </span>
                )
              })
            }
            </dl>
          </Card>
        </Col>
      )
    })
  }

  render() {
    return (
      <PageTitle title="Dashboard">
        <>
        <NominationRequireAttentionReport 
          className="mg-t-20"
        />
        <Can I="do" a="acl:nominations/list" passThrough>
          {
            can => {return (
              can
              ? (
                this.state.nomination_overview_status.length > 1 // > 1 because at least one item in a list, which is "All"
                ? <>
                    <h3 className="mg-t-20">Overall nomination status</h3>
                    <Row gutter={8}>          
                      {this.renderNominationOverviewStatus()}
                    </Row>
                  </>
                : <div className="text-center">
                    No data available
                  </div>
              )
              : <Alert className="mg-t-40" type="info">
                  If you do not have any menu actions available, please use direct links to the resources that were provided to you.
                </Alert>
            )}
          }
        </Can>
        </>
      </PageTitle>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses
  }
}

export default connect(mapStateToProps)(Dashboard)