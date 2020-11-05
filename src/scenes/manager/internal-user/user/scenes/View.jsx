import React from 'react'
import userService from '../userService';
import BtnDelete from 'src/_components/ui/BtnDelete';
import history from 'src/_helpers/history';
import Routing, { routesUI } from 'src/_helpers/routing';
import {connect} from 'react-redux'
import { userActions } from '../userDucks';
import PageTitle from 'src/_components/PageTitle';
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import UserEditForm from '../components/UserEditForm';

class UserView extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      isEditing: false,
      user: null
    }
  }

  componentDidMount() {
    return this.fetchUserData()
  }

  fetchUserData() {
    let {userUuid} = this.props.match.params
    return userService.fetchUserData(userUuid)
      .then(result => {
        this.setState({
          user: result.data
        })
      })
  }

  toggleIsEditingState(toggleValue) {
    if (toggleValue === undefined) {
      toggleValue = !this.state.isEditing;
    }
    this.setState({
      isEditing: false,
    }, () => {
      this.setState({
        isEditing: toggleValue,
      });
    });
  }

  onEditSave = (values) => {
    values.isInternal = Boolean(parseInt(values.isInternal))
    return this.props.dispatch(userActions.update(this.state.user.uuid, values))
    .then(res => {
      this.toggleIsEditingState(false)
      // this.props.history.push(Routing.generate('routes.ui.internalUser.users.view', {userUuid: res.data.uuid}))
      return this.fetchUserData()
    })
  }

  render() {
    if (!this.state.user) {
      return '';
    }

    let {user}  = this.state
    return (
      <PageTitle title={`User: ${user.fullName}`}>
        <div className="mg-t-20">
          {
            this.state.isEditing
            ? <UserEditForm
                onSubmit={this.onEditSave}
                onClose={()=>this.toggleIsEditingState(false)}
                initialValues={{
                  userId: user.uuid,
                  fullName: user.fullName,
                  email: user.email,
                  isInternal: user.isInternal === true ? "1" : "0",
                  roles: user.roles.map(i=>i.id),
                }}
              />
            : <>
                <div className="pull-left">
                  <h2>{user.fullName}</h2>
                </div>
                <div className="pull-left  h2-action-links">
                <ActionButtonsGroup
                  itemId={user.uuid}
                  onEdit={()=>this.toggleIsEditingState(true)}
                  onDelete={()=>userService.deleteUser(user.uuid).then(ers=>history.replace(Routing.generate(routesUI.internalUser.users._self)))}
                />
                </div>
                <div className="clearfix"/>

                <div>
                  ({user.email})
                </div>

                <div className="mg-t-20">
                  <dl className="dl-horizontal dt-bold dl-with-padding">
                    <dt>Roles</dt>
                    <dd>
                      <div><b>{user.isInternal ? 'Backend user' : 'Public user'}</b></div>
                      <ul>
                        {user.roles.map((i, idx)=> <li key={idx}>&nbsp;-&nbsp;{i.name}</li>)}
                      </ul>
                    </dd>
                    <dt>Labs</dt><dd><ul>{user.accessableLabs.map((i, idx)=> <li key={idx}>{i.name}</li>)}</ul></dd>
                    { 
                      user.isInternal 
                      ? <>
                        <dt>NominationSources</dt><dd><ul>{user.accessableNominationSources.map((i, idx)=> <li key={idx}>{i.name}</li>)}</ul></dd>
                        <dt>Permission</dt><dd><ul>{user.permission.map((i, idx)=> <li key={idx}>{i}</li>)}</ul></dd>
                        </>
                      : <>
                        </>
                    }
                  </dl>
                </div>
              </>
          }
        </div>
      </PageTitle>
    )
  }
}

export default connect()(UserView);