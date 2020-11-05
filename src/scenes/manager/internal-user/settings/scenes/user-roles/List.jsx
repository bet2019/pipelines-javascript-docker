import React from 'react'
import TableDataHandler from 'src/_mixin/TableDataHandler';
import Routing from 'src/_helpers/routing';
import {Link} from 'react-router-dom'
import BtnCreate from 'src/_components/ui/BtnCreate'
import BtnDelete from 'src/_components/ui/BtnDelete';
import {connect} from 'react-redux'
import { userRolesActions } from './userRolesDucks';
import userRolesService from './userRolesService';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class UserRolesList extends TableDataHandler(React.Component) {
  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      supportedPermissionMap: {},
      togglePermissionList: {}
    }

    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '20%'
      },
      {
        title: 'Permission',
        dataIndex: 'permission',
        width: '30%',
        render: (text, record, index) => {
          return (
            <>
              <a onClick={()=>{
                let togglePermissionList = {...this.state.togglePermissionList}
                togglePermissionList[record.id] = togglePermissionList[record.id] ? !togglePermissionList[record.id] : true
                this.setState({
                  togglePermissionList
                })
              }}>{`${record.permission.length} items out of ${Object.keys(this.state.supportedPermissionMap).length}`}</a>

              <ul className="list-unstyled" style={
                {display: this.state.togglePermissionList[record.id] ? 'block':'none',
                animation: 'fadeIn 1s'}
                }>
                {record.permission.map(i => 
                  <li key={`${record.id}-${i}`}>{this.state.supportedPermissionMap[i] ? this.state.supportedPermissionMap[i].title : i }</li>
                )}
              </ul>
            </>
          )
        }
      },
      {
        title: 'Access to Labs',
        dataIndex: 'labs',
        width: '20%',
        render: (text, record, index) => {
          return (
            <ul className="list-unstyled">
              {record.accessableLabs.map(i => 
                <li key={`${record.id}-${i.id}`}>{i.name}</li>
              )}
            </ul>
          )
        }
      },
      {
        title: 'Access to Nomination sources',
        dataIndex: 'nominationSources',
        width: '20%',
        render: (text, record, index) => {
          return (
            <ul className="list-unstyled">
              {record.accessableNominationSources.map(i => 
                <li key={i.id}>{i.name}</li>
              )}
            </ul>
          )
        }
      },

      {
        title: '',
        dataIndex: 'action',
        width: '10%',
        className: 'text-right',
        render: (text, record, index) => 
          <>
            <Link to={Routing.generate('routes.ui.internalUser.settings.acl.edit', {roleId: record.id})}>
              Edit
            </Link>
             &nbsp;|&nbsp;
            <BtnDelete
              onConfirm={()=>this.onConfirmDelete(record.id)}
            />
          </>
      }
    ]
  }

  componentDidMount() {
    userRolesService.getSupportedPermissionMap()
    .then( res => {
      this.setState({
        supportedPermissionMap: res.data
      })      
      return res
    })
    .then(res => super.componentDidMount())
  }

  onConfirmDelete = (id) => {
    return this.props.dispatch(userRolesActions.remove(id))
    .then(res=>this.handleTableFetch())
  }

  getHandleTableDataUrl = () => {
    return Routing.generate('routes.api.internal.userRoles.cget')
  }
  
  render() {
    return (
      <PageTitle title="User Roles">
        <Can I="do" a="acl:users/manage">
          <div className="pull-right">
            <BtnCreate className="mg-t-10 mg-b-10" onClick={() => this.props.history.push(Routing.generate('routes.ui.internalUser.settings.acl.create'))}>
              Create a new role
            </BtnCreate>
          </div>
          <div className="clearfix"/>
          <div>
            {this.renderTable(this.columns)}
          </div>
        </Can>
      </PageTitle>
    )
  }
}

export default connect()(UserRolesList)