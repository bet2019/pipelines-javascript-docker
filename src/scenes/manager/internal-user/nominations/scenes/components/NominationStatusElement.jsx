import React, { useState } from 'react'
import Menu from 'antd/lib/menu'
import { Can } from 'src/_helpers/permission';
import Popconfirm from 'antd/lib/popconfirm';
import Dropdown from 'antd/lib/dropdown'
import {connect} from 'react-redux'
import {IoIosArrowDown as IconIoIosArrowDown} from 'react-icons/io'
import StatusText from 'src/_components/nomination/StatusText';


const excludedStatuses = ['draft', 'deleted']

const NominationStatusElement = (props) => {

  let [dropdownMenuVisible, setDropdownMenuVisible] = useState(false)
  let [popconfirmVisible, setPopconfirmVisible] = useState({})
  let [statusReasonError, setStatusReasonError] = useState(false)
  let statusChangeReasonRef = React.createRef();

  function dropdownVisibilityChange(flag) {
    setDropdownMenuVisible(flag)
    if (flag === false) {
      var a = {...popconfirmVisible}
      Object.keys(a).map(i=>a[i]=false)
      setPopconfirmVisible(a)
    }
  }

  function statusMenu() {
    return (
      <Menu>
        {
          Object.keys(props.nominationStatuses).map(status => {

            let isNoteRequired = ['on_hold', 'rejected', 'closed'].indexOf(status) >= 0

            return [...excludedStatuses, props.statusId].indexOf(status) !== -1
            ? ''
            : <Menu.Item key={status}>
                <Popconfirm
                  overlayClassName="popconfirm-change-status-above-menu"
                  title={
                    <form>
                      <div className="form-group">
                      <label>Reason {isNoteRequired?<span className="required"></span>:''} :</label>
                      <br/>
                      <textarea ref={statusChangeReasonRef} rows={4}></textarea>
                      {statusReasonError?<div className="app-error">{statusReasonError}</div>:''}
                      </div>
                    </form>
                  }
                  visible={dropdownMenuVisible && popconfirmVisible[status] && true === popconfirmVisible[status]}
                  onVisibleChange={(isVisible,a,b,c)=>{
                    var a = {...popconfirmVisible}
                    a[status] = isVisible
                    setPopconfirmVisible(a)
                    setTimeout(()=>{
                      statusChangeReasonRef.current ? statusChangeReasonRef.current.value= '' : ''
                    }, 50)
                  }}
                  onConfirm={async ()=>{
                    let statusChangeNote = statusChangeReasonRef.current.value
                    var a = {...popconfirmVisible}
                    a[status] = true
                    setPopconfirmVisible(a)

                    if (isNoteRequired && statusChangeNote.trim().length === 0) {
                      setStatusReasonError("Required")
                    } else{
                      try {
                        await props.onChange(props.nominationId, {statusId: status, statusChangeNote})
                        dropdownVisibilityChange(false)                        
                      } catch (err) {
                        setStatusReasonError((err.errors && err.errors.statusChangeNote) || err.message)
                      }
                    }
                  }}
                  onClick={()=>{
                    setStatusReasonError(false)
                  }}
                ><a>{props.nominationStatuses[status].name}</a></Popconfirm>
              </Menu.Item>
          })
        }
      </Menu>
    )
  }

  return (
    <>
      <Can I="do" a="acl:nominations/manage" passThrough>
      { can => (excludedStatuses.indexOf(props.statusId) >= 0)
          ? <StatusText statusId={props.statusId}>{props.nominationStatuses[props.statusId].name}</StatusText>
          : ( can
              ? <Dropdown overlay={statusMenu} trigger={['click']}
                onVisibleChange={dropdownVisibilityChange}
                visible={dropdownMenuVisible}
                >
                  <a className="ant-dropdown-link" href="#">
                    <StatusText statusId={props.statusId}>{props.nominationStatuses[props.statusId].name} <IconIoIosArrowDown /></StatusText> 
                  </a>
                </Dropdown>
              : <StatusText statusId={props.statusId}>{props.nominationStatuses[props.statusId].name}</StatusText>
            )
      }
      </Can>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    nominationStatuses: state.rootApp.nominationStatuses
  }
}

export default connect(mapStateToProps)(NominationStatusElement)