import React from 'react'
import LogoLoadingSpinner from 'src/_components/ui/LogoLoadingSpinner'
import PageTitle from 'src/_components/PageTitle'
import permissionAbility, { Can } from 'src/_helpers/permission'
import reportService from 'src/scenes/manager/internal-user/reports/reportService'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import Modal from 'antd/lib/modal'
import BtnCreate from 'src/_components/ui/BtnCreate'
import BtnDelete from 'src/_components/ui/BtnDelete'
import Icon from 'antd/lib/icon'
import {AiOutlineFileExcel as IconAiOutlineFileExcel} from 'react-icons/ai'
import InternalProductFeedbackItemCreatEditForm from 'src/scenes/manager/internal-user/reports/components/InternalProductFeedbackItemCreatEditForm'
import FormatDateString from 'src/_components/FormatDateString';
import config from 'src/config';
import moment from 'moment'

class InternalProductFeedback extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null, 
      dialogData: null,
      dialogVisible: false,
      dialogActionType: null
    }

    this.columns = [
      {
        title: 'Date',
        dataIndex: 'submissionDate',
        width: "15%",
        render: (text, record, index) => <>
          <FormatDateString text={text} format={config.dateFormat}/>
          <br/>
          <small>(<FormatDateString text={text} format={config.dateFormat} ago={true}/>)</small>
        </>
      },
      {
        title: 'Team',
        dataIndex: 'team',
        width: "15%",
      },
      {
        title: 'Channel',
        dataIndex: 'channel',
        width: "15%",
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: "25%",
        render: (text, record, index) => <span dangerouslySetInnerHTML={{ __html: text ? text.replace(/\n/g, "<br />") : text }}/>
      },
      {
        title: 'Reporting method',
        dataIndex: 'reportingMethod',
        width: "25%",
        render: (text, record, index) => <span dangerouslySetInnerHTML={{ __html: text ? text.replace(/((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-{}]*[\w@?^=%&/~+#-{}])?)/g, '<a href="$1" target="_blank" rel="nofollow">$1 <small>&#x2924;</small></a>').replace(/\n/g, "<br />") : text }}/>
      },
      {
        title: '',
        dataIndex: 'action',
        // fixed: 'right',
        className: 'text-right',
        render: (text, record, index) => {
          return <Can I="do" a="acl:reports/internal_product_feedback/manage">
            <a onClick={()=>this.onOpenDialog(record)}>Edit</a>
             &nbsp;|&nbsp;
            <BtnDelete 
              onConfirm={()=>this.onConfirmDelete(record.uuid)}
            />
          </Can>
        }
      }
    ]
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    return reportService.getInternalProductFeedbackCollection()
    .then( res => {
      this.setState({
        data: res.data
      })
    })
  }

  onConfirmDelete = (uuid) => {
    // if (!permissionAbility.can('do', 'acl:reports/internal_product_feedback/manage') ) {
    //   throw new Error('Unauthorized action');
    // }
    return reportService.deleteInternalProductFeedback(uuid)
    .then( res => {      
      return this.fetchData()
    })
  }

  onUpdateSubmit = (uuid, values) => {
    // if (!permissionAbility.can('do', 'acl:reports/internal_product_feedback/manage') ) {
    //   throw new Error('Unauthorized action');
    // }
    return reportService.putInternalProductFeedback(uuid, values)
    .then( res => {
      this.onCancelDialog()
      return this.fetchData()
    })
  }

  onCreateNew = (values) => {
    // if (!permissionAbility.can('do', 'acl:reports/internal_product_feedback/manage') ) {
    //   throw new Error();
    // }
    return reportService.postInternalProductFeedback(values)
    .then( res => {
      this.onCancelDialog()
      return this.fetchData()
    })
  }

  onCancelDialog = () => {
    this.setState({
      dialogVisible: false,
      dialogData: null
    })
  }

  onOpenDialog(data = null) {
    this.setState({
      dialogVisible: true,
      dialogData: data,
      dialogTitle: data.uuid ? 'Update item' : 'New item'
    })
  }
  
  render() {
    if (!this.state.data) {
      return <LogoLoadingSpinner />
    }

    return (
      <Can I="do" a="acl:reports/view">
        <PageTitle title="Report :: Internal Product Feedback">
          <section className="report">
            <Row className="mg-t-20 mg-b-20">
              <Col>
                <div className="pull-right">
                  <Can I="do" a="acl:reports/export">
                    <Button
                      onClick={()=>reportService.getInternalProductFeedbackCollection({export2xlsx: true})}
                      type="primary"
                    >
                      <Icon component={IconAiOutlineFileExcel} />
                      Export to Excel
                    </Button>
                  </Can>
                  &nbsp;
                  <Can I="do" a="acl:reports/internal_product_feedback/manage">
                    <BtnCreate onClick={()=>this.onOpenDialog({
                      submissionDate: moment().format(config.dateFormat)
                    })}>Add a record</BtnCreate>
                  </Can>
                </div>
              </Col>                    
            </Row>

            <Modal 
              maskClosable={false}
              destroyOnClose={true}
              title={this.state.dialogTitle}
              visible={this.state.dialogVisible}
              onCancel={this.onCancelDialog}
              footer={null}
            >
              <InternalProductFeedbackItemCreatEditForm
                initialValues={this.state.dialogData}
                onClose={this.onCancelDialog}
                onSubmit={ values => this.state.dialogData && this.state.dialogData.uuid ? this.onUpdateSubmit(this.state.dialogData.uuid, values) : this.onCreateNew(values)}
              />
            </Modal>
            
            <Table 
              key="uuid"
              rowKey="uuid"
              columns={this.columns} 
              dataSource={this.state.data} 
            />
                   
          </section>
        </PageTitle>
      </Can>
    )
  }
}



export default InternalProductFeedback