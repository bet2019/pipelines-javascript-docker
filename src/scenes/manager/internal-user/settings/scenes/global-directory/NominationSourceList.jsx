import React from 'react'
import Routing from 'src/_helpers/routing';
import GlobalDirectoryAbstract from './components/GlobalDirectoryAbstract';
import {connect} from 'react-redux'
import globalDirectoryService from './globalDirectoryService';
import PageTitle from 'src/_components/PageTitle';
import { Can } from 'src/_helpers/permission';

class NominationSourceList extends React.Component {
  
  render() {
    const scope = 'nominationSource'
    return (
      <Can I="do" a="acl:settings/manage">
        <PageTitle title="Nomination sources">
          <GlobalDirectoryAbstract
            tableDataUrl={Routing.generate('routes.api.internal.globalDirectory.cget',{gdScope: scope})}
            onCreateNew={ values => globalDirectoryService.create(scope, values) }
            onConfirmDelete={ id => globalDirectoryService.remove(scope, id) }
            onUpdateSubmit={ (id, values) => globalDirectoryService.update(scope, id, values) }
          />
        </PageTitle>
      </Can>
    )
  }

}

export default connect()(NominationSourceList);