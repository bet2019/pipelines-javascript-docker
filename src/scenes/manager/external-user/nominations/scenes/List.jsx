import React from 'react';
import TableDataHandler from 'src/_mixin/TableDataHandler';
import Routing from 'src/_helpers/routing';
import {Link} from 'react-router-dom'
import BtnCreate from 'src/_components/ui/BtnCreate';
import PageTitle from 'src/_components/PageTitle';
import {connect} from 'react-redux'
import { withTranslation } from 'react-i18next';
import FormatDateString from 'src/_components/FormatDateString';

class NominationList extends TableDataHandler(React.Component){

  constructor(props) {
    super(props)
    const {i18n} = props

    this.columns = [
      {
        title: i18n.t('label.company'),
        dataIndex: 'company.name',
        width: "20%",
        render: (text, record, index) =>
          <Link to={Routing.generate('routes.ui.externalUser.nominations.view', {nominationId: record.uuid})}>
            {record.company ? record.company.name : ''}
          </Link>
      },
      {
        title: i18n.t('label.lab'),
        dataIndex: 'lab.name',
        width: "15%",
      },
      {
        title: i18n.t('label.status'),
        dataIndex: 'statusId',
        align: 'center',
        render: (text, record, index) => {return this.props.nominationStatuses[text].name}
      },
      {
        title: i18n.t('label.created_at'),
        dataIndex: 'createdAt',
        width: "10%",
        render: (text, record, index) => <FormatDateString text={text}/>
      },
      {
        title: i18n.t('label.submitted_at'),
        dataIndex: 'submittedAt',
        width: "10%",
        render: (text, record, index) => <FormatDateString text={text}/>
      }
    ]
  }

  getHandleTableDataUrl() {
    return Routing.generate('routes.api.externalUser.nominations.cget')
  }

  render() {

    const {i18n} = this.props

    return  (
      <PageTitle title={i18n.t('page.title.nominations')}>
        <>
          <div className="pull-right mg-t-10 mg-b-10">
            <BtnCreate onClick={() => this.props.history.push(Routing.generate('routes.ui.externalUser.nominations.create'))}>
              {i18n.t('label.nomination_new_project')}
            </BtnCreate>
          </div>
          <div className="clearfix"/>
          {this.renderTable(this.columns)}
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

export default connect(mapStateToProps)(withTranslation()(NominationList))