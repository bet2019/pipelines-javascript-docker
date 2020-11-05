import React from 'react';
import TableDataHandler from 'src/_mixin/TableDataHandler';
import Routing, { routesUI } from 'src/_helpers/routing';
import {Link} from 'react-router-dom'
import BtnCreate from 'src/_components/ui/BtnCreate';
import PageTitle from 'src/_components/PageTitle';
import NominationListFilter from './components/NominationListFilter';
import {connect} from 'react-redux'
import FormatDateString from 'src/_components/FormatDateString';
import permissionAbility, { Can } from 'src/_helpers/permission';
import urlHelper from 'src/_helpers/urlHelper';
import SprintNumberName from './components/SprintNumberName';
import MsTeamsLogo from 'src/public/assets/img/teams-logo.png';
import ExternalLink from 'src/_components/pageElements/ExternalLink';
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';

class NominationList extends TableDataHandler(React.Component){
  static contextType = GlobalSettingsContext
  
  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      updateUrlSearchQuery: true
    }

    let that = this

    this.columns = [
      {
        key: 'colorTag',
        title: '',
        width: "6px",
        className: "color-tag-column-prefix",
        render(text, record) {
          return {
            props: {
              style: { 
                background: that.statusColor(record.statusId)
              }
            },
            children: <div></div>
          }
        }
      },
      {
        title: 'Company',
        dataIndex: 'company.name',
        width: "35%",
        render: (text, record, index) => {
          return <>
            {
              permissionAbility.can('do', 'acl:nominations/view/general_info')
              ? <>
                  <Link to={Routing.generate('routes.ui.internalUser.nominations.view', {nominationId: record.uuid})}>
                    {record.company ? record.company.name : ''}
                  </Link>
                  <div>
                      {
                        permissionAbility.can('do', 'acl:lab_internal_info') && record.company.msTeamsChannelLink 
                        ? <ExternalLink url={record.company.msTeamsChannelLink} noArrowIcon> <img src={MsTeamsLogo} height="20px"/>  </ExternalLink>
                        : ''
                      }
                  </div>
                </>
              : record.company ? record.company.name : ''
            }
            <div>
              <div>{record.contactPersonName}{record.contactPersonRole?` - ${record.contactPersonRole}`:''}</div>
              <div>{record.contactPersonPhone}{record.contactPersonEmail?`; ${record.contactPersonEmail}`:''}</div>
            </div>
            </>
        }
      },
      {
        title: 'Lab',
        dataIndex: 'lab.name'
      },
      {
        title: 'Sprint #',
        dataIndex: 'engagementSprintN',
        width: "8%",
        align: 'center',
        render: (text, record, index) => {
          return <>
              {
                text || text == 0 || record.writeup
                ? <SprintNumberName number={text} questionReplace={true}/>
                : ''
              }
              { 
                permissionAbility.can('do', 'acl:nominations::writeups/view') && record.writeup
                ? <>
                  <br/>
                  {
                    permissionAbility.can('do', 'acl:nominations::writeups/view')
                    ? <Link to={Routing.generate(routesUI.internalUser.nominations.writeups.view, {
                        nominationId: record.uuid,
                        writeupId: record.writeup.uuid
                      })}>(writeup)</Link> 
                    : 'has writeup'
                  }
                  </>
                : null
              }
              </>
        }
      },
    ]
    
    if (permissionAbility.can('do','acl:nominations/manage') || permissionAbility.can('do','acl:nominations/view/source_info')) {
      this.columns.push(
        {
          title: 'Source / Vertical',
          dataIndex: 'source.name',
          align: 'center',
          render: (text, record, index) => {
            return <>
              {text}
              {
                record.industryVertical
                ? <>
                    <br/>/<br/>
                    {record.industryVertical.name}
                  </>
                : ''
              }
            </>
          }
        },
      )
    }

    this.columns = [
      ...this.columns, 
      ...[
        {
          title: 'Created by',
          dataIndex: 'createdBy',
          width: "15%",
          render: (text, record, index) => 
            <div>
              <div>{record.createdByUser ? record.createdByUser.fullName : ''}</div>
              <div>{record.createdByUser ? record.createdByUser.email : ''}</div>
            </div>
        },
        {
          title: 'Status',
          dataIndex: 'statusId',
          align: 'center',
          render(text, record) {
            return {
              props: {
                style: { 
                  color: that.statusColor(record.statusId),
                  fontWeight: 650
                }
              },
              children: <div>{that.props.nominationStatuses[text].name}</div>
            }
          }
        },
        {
          title: <>Submitted<br/>at</>,
          dataIndex: 'submittedAt',
          width: '8%',
          render: (text, record, index) => (
            <div className="text-muted">
              <FormatDateString text={text}/>
            </div>
          )
        }
      ]
    ]
  }

  statusColor(statusId) {
    return [
      this.props.nominationStatuses.new.id,
      this.props.nominationStatuses.open.id,
      this.props.nominationStatuses.on_hold.id
      ].indexOf(statusId)>-1
    ? (this.context && this.context.nominationStatusColorMap[statusId]) || ''
    : ''
  }

  getHandleTableDataUrl() {
    return Routing.generate('routes.api.internal.nominations.cget')
  }

  render() {
    let initialValues = urlHelper.parseSearchContentToObject()

    return  (
      <PageTitle title="Nominations" >
        <Can I="do" a="acl:nominations/list">
          <div className="pull-right mg-t-10 mg-b-10">
            <Can I="do" a="acl:nominations/manage">
              <BtnCreate onClick={() => this.props.history.push(Routing.generate('routes.ui.internalUser.nominations.create'))}>
                Create a nomination
              </BtnCreate>
            </Can>
          </div>
          <div className="clearfix"/>
          <div>          
            <NominationListFilter 
              onChange={this.filterChanged}
              initialValues={initialValues && initialValues.filters || {}}
            />
          </div>
          <div className="table td-text-small-09">
            {this.renderTable(this.columns)}
          </div>
        </Can>
      </PageTitle>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses
  }
}

export default connect(mapStateToProps)(NominationList)