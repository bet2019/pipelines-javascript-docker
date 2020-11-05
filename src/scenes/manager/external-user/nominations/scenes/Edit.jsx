import React from 'react'
import NominationEditForm from './components/NominationEditForm';
import { nominationActions } from '../nominationDucks';
import Routing from 'src/_helpers/routing';
import {connect} from 'react-redux'
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner';
import PageTitle from 'src/_components/PageTitle';
import { withTranslation } from 'react-i18next';
import { toFinalFormStyle } from 'src/_helpers/FormSubmissionError';

class NominationEdit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    return this.props.dispatch(nominationActions.get(this.props.match.params.nominationId))
    .then( res => {
      this.setState({
        data: res.data
      })
    })
  }


  onSubmit = (values) => {
    let nominationId = this.props.match.params.nominationId
    // FIXME: !!! 
    return this.props.dispatch(nominationActions.update(nominationId, values))
    .then( res => {
      this.props.history.push(Routing.generate('routes.ui.externalUser.nominations.view', {nominationId}))
    })    
    .catch(e=>{
      return toFinalFormStyle(e)
    })
  }

  render() {

    const {i18n} = this.props

    if (!this.state.data) {
      return <LogoLoadingSpinner/>
    }

    return (
      <PageTitle title={i18n.t('page.title.edit_nomination')}>
        <NominationEditForm
          onSubmit={this.onSubmit}
          onClose={this.props.history.goBack}
          initialValues={this.state.data}
        />
      </PageTitle>
    )
  }
}


export default connect()(withTranslation()(NominationEdit))