import React from 'react'
import TableDataHandler from 'src/_mixin/TableDataHandler';
import Routing, { routesUI, routesAPI } from 'src/_helpers/routing';
import {Link} from 'react-router-dom'
import BtnCreate from 'src/_components/ui/BtnCreate';
import PageTitle from 'src/_components/PageTitle';
import UserListFilter from '../components/UserListFilter';
import urlHelper from 'src/_helpers/urlHelper';
import api from 'src/_helpers/api';
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';

class UserList extends TableDataHandler(React.Component) {
  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      updateUrlSearchQuery: true,
      rolesDataSource: null
    }

    this.columns = [
      {
        title: 'Name & Email',
        dataIndex: 'email',
        width: "25%",
        render: (text, record, index) => 
        <div>          
          <div>{record.fullName}</div>                      
          <Link to={Routing.generate('routes.ui.internalUser.users.view', {userUuid: record.uuid})}>
            <div>{record.email}</div>
          </Link>
        </div>
      },
      {
        title: 'Roles',
        dataIndex: 'roles',
        width: "25%",
        render: (text, record, index) => record.roles.map(i=>i.name).join('; ')
      },
      {
        title: 'Access to Labs',
        dataIndex: 'labs',
        render: (text, record, index) => record.accessableLabs.map(i=>i.name).join('; ')
      },
      {
        title: 'Access to Nomination sources',
        dataIndex: 'nominationSources',
        render: (text, record, index) => record.accessableNominationSources.map(i=>i.name).join('; ')
      },

      // {
      //   title: '',
      //   dataIndex: 'action',
      //   fixed: 'right',
      //   className: 'text-right',
      //   render: (text, record, index) => {
      //     return <>
      //       {text}-{record}-{index}
      //     </>
      //   }
      // }
    ]
  }

  componentDidMount() {
    return api.get(Routing.generate(routesAPI.internal.userRoles.cgetFlat))
    .then( res => {
      this.setState(
        {rolesDataSource: res.data}, 
        ()=> super.componentDidMount()
      )
    })
  }

  getHandleTableDataUrl() {
    return Routing.generate(routesAPI.internal.users.cget)
  }
  
  render() {
    let initialValues = urlHelper.parseSearchContentToObject()
    if (initialValues && initialValues.filters && initialValues.filters.isInternal !== undefined) {
      initialValues.filters.isInternal = Boolean(parseInt(initialValues.filters.isInternal)) === true ? '1' : '0'
    }

    return (
      <PageTitle title="Users">
        <>
          <div className="pull-right mg-t-10 mg-b-10">
            <BtnCreate onClick={() => this.props.history.push(Routing.generate(routesUI.internalUser.users.create))}>
              Create a user
            </BtnCreate>
          </div>
          <div className="clearfix"/>
          <div>
            <UserListFilter 
              onChange={this.filterChanged}
              initialValues={initialValues && initialValues.filters || {}}
              rolesDataSource={this.state.rolesDataSource || []}
            />
          </div>
          <div>
            {
              this.state.rolesDataSource === null
                ? <LogoLoadingSpinner />
                : this.renderTable(this.columns)
            }
          </div>
        </>
      </PageTitle>
    )
  }
}

export default UserList;