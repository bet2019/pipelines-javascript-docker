import React from 'react';
import {connect} from 'react-redux'
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import CompanyEditForm from '../components/CompanyEditForm';
import { companyActions } from '../companyDucks';
import PageTitle from 'src/_components/PageTitle';
import { withTranslation } from 'react-i18next';
import { toFinalFormStyle } from 'src/_helpers/FormSubmissionError';

class CompanyEdit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
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
    .catch(e=>{
      return toFinalFormStyle(e)
    })
  }  

  render() {
    const {i18n} = this.props

    return (
      <PageTitle title={i18n.t('page.title.company_edit')}>
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
    )
  }
}

export default connect()(withTranslation()(CompanyEdit))