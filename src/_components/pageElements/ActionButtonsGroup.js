import React from 'react'
import PropTypes from "prop-types";
import Popconfirm from 'antd/lib/popconfirm';
import {FiEdit3 as IconFiEdit3} from 'react-icons/fi'
import {IoIosTrash as IconIoIosTrash, IoMdCreate as IconIoMdCreate} from 'react-icons/io'

const ActionButtonsGroup = (props) => {

  let actions = []

  if (props.onEdit) {
    actions.push(
      <a
        className="text-muted"
        onClick={() => props.onEdit(props.itemId)}>
        <IconFiEdit3/>
      </a>
    )
  }
   
  if (props.onDelete) {
    actions.push(
      <a
        className="text-muted"
      >
        <Popconfirm title="Are you sure?"
          onConfirm={() => props.onDelete(props.itemId)}
        >
          <IconIoIosTrash/>
        </Popconfirm>
      </a>
    )
  }

  {
    undefined !== props.extraElements
    ? props.extraElements.map( (el ,idx) => {
      actions.push(el.component)
    })
    : ''
  }

  return (
      <span className={props.className}>
        {
          actions.map( (item, key, arr) => {
            let divider = key<arr.length-1 && <span className="text-muted">&nbsp;|&nbsp;</span>;
            return <span key={key}>
                {item}
                {divider}
              </span>
          })
          // actions
        }
      </span>
  )
}

ActionButtonsGroup.propTypes = {
  itemId: PropTypes.any.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  extraElements: PropTypes.any,
}

export default ActionButtonsGroup