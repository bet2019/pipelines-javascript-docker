import React from 'react'
import UserCreateForm from '../components/UserCreateForm';
import Routing from 'src/_helpers/routing';
import {connect} from 'react-redux'
import { userActions } from '../userDucks';
import PageTitle from 'src/_components/PageTitle';
import Alert from 'antd/lib/alert';

class Create extends React.Component {

  onSubmit = (values) => {
    return this.props.dispatch(userActions.createNewUser(values))
    .then(res => {
      this.props.history.push(Routing.generate('routes.ui.internalUser.users.view', {userUuid: res.data.uuid}))
    })
  }

  render() {
    return (
      <PageTitle title="New user">
        <div className="mg-t-20">
          <Alert
            type="info" 
            message="User will be created with a Backend user access"
            description={<>Public users no need to be added here. Those users just need to login using their email address.</>}
          />
          <div className="mg-t-20"> 
            <UserCreateForm
              onSubmit={this.onSubmit}
              onClose={this.props.history.goBack}
            />
          </div>
        </div>  
      </PageTitle>
    )
  }
}

export default connect()(Create)