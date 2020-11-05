import React from 'react';
import {connect} from 'react-redux'
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import CompanyEditForm from '../components/CompanyEditForm';
import { companyActions } from '../companyDucks';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class CompanyEdit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dataLoaded: false,
      instanceData: null,
    }
  }

  componentDidMount = () => {
    return this.props.dispatch(companyActions.get(this.props.match.params.companyId))
    .then( resInstanceData => {
      this.setState({
        instanceData: resInstanceData.data,
      })
    })
  }

  onSubmit = (values) => {
    let companyId = this.props.match.params.companyId
    // FIXME: !!! 
    return this.props.dispatch(companyActions.update(companyId, values))
    .then( res => {
      this.props.history.goBack()
    })
  }  

  render() {
    return (
      <Can I="do" a="acl:companies/manage/general_info">
        <PageTitle title="Edit company">
          <div className="mg-t-20">
            {
              this.state.instanceData
              ? <CompanyEditForm 
                  onSubmit={this.onSubmit}
                  onClose={this.props.history.goBack}
                  initialValues={this.state.instanceData}
                />
              : <LogoLoadingSpinner/>
            }
          </div>
        </PageTitle>
      </Can>
    )
  }
}

export default connect()(CompanyEdit)