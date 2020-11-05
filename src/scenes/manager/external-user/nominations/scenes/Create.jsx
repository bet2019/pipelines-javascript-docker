import React from 'react'
import NominationCreateForm from './components/NominationCreateForm';
import { nominationActions } from '../nominationDucks';
import Routing from 'src/_helpers/routing';
import {connect} from 'react-redux'
import PageTitle from 'src/_components/PageTitle';
import applytoiotinsiders from 'src/public/assets/img/applytoiotinsiders.jpg'
import { withTranslation } from 'react-i18next';
import { toFinalFormStyle } from 'src/_helpers/FormSubmissionError';

class NominationCreate extends React.Component {

  onSubmit = (values) => {
    return this.props.dispatch(nominationActions.create(values))
    .then( res => {
      this.props.history.replace(Routing.generate('routes.ui.externalUser.nominations.view', {nominationId: res.data.uuid}))
    })
    .catch(e=>{
      return toFinalFormStyle(e)
    })
  }

  render() {

    const {i18n} = this.props

    return (
      <PageTitle title={i18n.t('translation:page.title.new_nomination')}>
        <>
            <section data-grid="col-12" className="m-highlight-feature f-align-right" id="iot-hero-wrapper">
              <picture className="c-image">
                <img itemProp="logo" src={applytoiotinsiders} alt={i18n.t('translation:msft_ai_iot_insider_labs')} className="c-image"/>
              </picture>
              <div className="iot-hero-text">
                <p className="c-heading ng-binding">{i18n.t('translation:msft_ai_iot_insider_labs')}</p>
                <p className="c-paragraph ng-binding">{i18n.t('external_nominations:nomination.send_engineers_text')}</p>
              </div>
            </section>
          <div className="mg-t-20" data-grid="col-12">

            <h1>{i18n.t('external_nominations:nomination.aiot_lan_nomination_form')}</h1>

            <p>{i18n.t('external_nominations:nomination.intro_1')}</p>
            <ul className="default-list">
              <li>{i18n.t('external_nominations:nomination.intro_2_1')}</li>
              <li>{i18n.t('external_nominations:nomination.intro_2_2')}</li>
              <li>{i18n.t('external_nominations:nomination.intro_2_3')}</li>
            </ul>

            <p>{i18n.t('external_nominations:nomination.intro_3')}</p>

          </div>

          <div className="mg-t-20" data-grid="col-12">
            <NominationCreateForm
              onSubmit={this.onSubmit}
              onClose={this.props.history.goBack}
            />
          </div>

          <div className="mg-t-40" data-grid="col-12">
            <div>
              <strong>{i18n.t("external_nominations:privacy_statement_label")}</strong>
            </div>
            <div className="text-small-09">
              {i18n.t("external_nominations:privacy_statement_descr")}
            </div>
          </div>
        </>
      </PageTitle>
    )
  }
}


export default connect()(withTranslation(['external_nominations'])(NominationCreate))