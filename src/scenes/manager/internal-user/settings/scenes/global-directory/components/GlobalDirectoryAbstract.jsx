import React from 'react'
import TableDataHandler from 'src/_mixin/TableDataHandler';
import {connect} from 'react-redux'
import BtnCreate from 'src/_components/ui/BtnCreate';
import BtnDelete from 'src/_components/ui/BtnDelete';
import Modal from 'antd/lib/modal'
import GDItemCreatEditForm, { GD_ITEM_CREATE_EDIT_FORM_ID } from './GDItemCreatEditForm';
import PropTypes from 'prop-types';
import {reset as resetForm} from 'redux-form'

// const GlobalDirectoryAbstract = base => class extends base {
class GlobalDirectoryAbstract extends TableDataHandler(React.Component) {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        // render: (text, record, index) => {record.name}
        width: '90%'
      },
      {
        title: '',
        dataIndex: 'action',
        // fixed: 'right',
        className: 'text-right',
        render: (text, record, index) => {
          return <>
            <a onClick={()=>this.onOpenDialog(record)}>Edit</a>
             &nbsp;|&nbsp;
            <BtnDelete 
              onConfirm={()=>this.onConfirmDelete(record.id)}
            />
          </>
        }
      }
    ]

    this.state = {
      ...this.state,
      dialogData: null,
      dialogVisible: false,
      dialogActionType: null
    }
  }

  onConfirmDelete = (id) => {
    return this.props.onConfirmDelete(id)
    .then( res => {      
      return this.handleTableFetch()
    })
  }

  onUpdateSubmit = (id, values) => {
    return this.props.onUpdateSubmit(id, values)
    .then( res => {
      this.onCancelDialog()
      return this.handleTableFetch()
    })
  }

  onCreateNew = (values) => {
    return this.props.onCreateNew(values)
    .then( res => {
      this.onCancelDialog()
      return this.handleTableFetch()
    })
  }

  onCancelDialog = () => {
    this.setState({
      dialogVisible: false,
      dialogData: null
    })
    this.props.dispatch(resetForm(GD_ITEM_CREATE_EDIT_FORM_ID))
  }

  onOpenDialog(data = null) {
    this.props.dispatch(resetForm(GD_ITEM_CREATE_EDIT_FORM_ID))
    this.setState({
      dialogVisible: true,
      dialogData: data,
      dialogTitle: data ? 'Update item' : 'New item'
    })
  }

  getHandleTableDataUrl() {
    return this.props.tableDataUrl
  }
  
  render() {
    return (
      <>
        <Modal 
          maskClosable={false}
          destroyOnClose={true}
          title={this.state.dialogTitle}
          visible={this.state.dialogVisible}
          onCancel={this.onCancelDialog}
          footer={null}
        >
          {
            this.state.dialogData
            ? <GDItemCreatEditForm
                initialValues={this.state.dialogData}
                onClose={this.onCancelDialog}
                onSubmit={ values => this.onUpdateSubmit(this.state.dialogData.id, values)}
              />
            : <GDItemCreatEditForm
                onClose={this.onCancelDialog}
                onSubmit={ values => this.onCreateNew(values)}
              />
          }
        </Modal>

        <div className="pull-right mg-t-10 mg-b-10">
          <BtnCreate onClick={()=>this.onOpenDialog()}>
            Create a new item
          </BtnCreate>
        </div>
        <div className="clearfix"/>
        <div>
          {this.renderTable(this.columns)}
        </div>
      </>
    )
  }
}

GlobalDirectoryAbstract.propTypes = {
  tableDataUrl: PropTypes.string.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  onUpdateSubmit: PropTypes.func.isRequired,
  onCreateNew: PropTypes.func.isRequired,
};

// export default GlobalDirectoryAbstract;
export default connect()(GlobalDirectoryAbstract);