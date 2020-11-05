import Steps from 'antd/lib/steps'
import Popover from 'antd/lib/popover'
import React, { useState, useEffect } from 'react'
import { Can } from 'src/_helpers/permission';
import { AiOutlineCheckCircle as IconAiOutlineCheckCircle} from 'react-icons/ai'
import { IoIosRadioButtonOff as IconIoIosRadioButtonOff } from 'react-icons/io'
import { AiOutlineStop as IconAiOutlineStop } from 'react-icons/ai'
import { AiOutlineRightCircle as IconAiOutlineRightCircle } from 'react-icons/ai'
import { AiOutlineEllipsis as IconAiOutlineEllipsis } from 'react-icons/ai'
import { AiOutlineCheck as IconAiOutlineCheck } from 'react-icons/ai'
import { IoIosInformationCircleOutline as IconIoIosInformationCircleOutline } from 'react-icons/io'
import { connect } from 'react-redux'
import nominationService from '../../nominationService';
import config from 'src/config';
import moment from 'moment'
import Popconfirm from 'antd/lib/popconfirm';
import StatusText from 'src/_components/nomination/StatusText';
const { Step } = Steps

const NominationWorkflowSteps = (props) => {

    let [current, setcCurrent] = useState(0)
    let [workflowSteps, setWorkflowSteps] = useState([])
    let statusChangeReasonRef = React.createRef();

    useEffect(() => {
        fetchData()
    }, [props.nominationStatusId])

    function fetchData() {
        return nominationService.cgetWorkflowSteps(props.nominationId)
            .then(res => {
                let steps = []

                //push submit as first point
                steps.push({
                    stepKey: 'submit',
                    title: 'Submitted',
                    subTitle: props.nominationSubmittedAt ? moment(props.nominationSubmittedAt).format(config.dateFormat) : '',
                    checkTime: props.nominationSubmittedAt,
                    status: 'begin',
                    disabled: true
                })

                //steps
                res.data.forEach((step, idx) => {
                    steps.push({
                        stepKey: step.stepKey,
                        title: config.nominationWorkflowSteps[step.stepKey] && config.nominationWorkflowSteps[step.stepKey].name,
                        subTitle: step.checkTime ? moment(step.checkTime).format(config.dateFormat) : '',
                        disabled: false,
                        description: step.createdBy,
                        status: step.checkTime ? "finish" : '',
                        checkTime: step.checkTime,
                        uuid: step.uuid,
                        createdBy: step.createdBy,
                        note: step.note
                    })
                });

                //push last status as end point
                steps.push({
                    stepKey: config.nominationStatuses[props.nominationStatusId].name,
                    title: <StatusText statusId={props.nominationStatusId}>{config.nominationStatuses[props.nominationStatusId].name}</StatusText>,
                    status: 'end',
                    disabled: true
                })
                setWorkflowSteps(steps)
            })
    }

    function isAllowedToAction(stepArrayIdx) {
        if ([
            config.nominationStatuses.closed.id, 
            config.nominationStatuses.rejected.id,
            config.nominationStatuses.completed.id
            ].indexOf(props.nominationStatusId) >= 0){
                return false
            }

        if(workflowSteps[stepArrayIdx].checkTime
            && workflowSteps[stepArrayIdx+1] && !workflowSteps[stepArrayIdx+1].checkTime){
                // cannot uncheck if next is checked
                return true
        }
        if(!workflowSteps[stepArrayIdx].checkTime
            && workflowSteps[stepArrayIdx-1] && workflowSteps[stepArrayIdx-1].checkTime){
                return true
        }
        return false
    }

    function onChange(index, note = null) {
        if (isAllowedToAction(index)) {
            if (workflowSteps[index].checkTime){
                return uncheckCurrentStep(workflowSteps[index].uuid)
            } else {
                return checkCurrentStep(workflowSteps[index].stepKey, note)
            }
        }
        return false
    };

    function checkCurrentStep(stepKey, note) {
        let value = { stepKey: stepKey, note: note }
        return nominationService.createWorkflowStep(props.nominationId, value)
            .then(res => {
                return fetchData()
            })
    }

    function uncheckCurrentStep(uncheckStepUuid) {
        return nominationService.deleteWorkflowStep(props.nominationId, uncheckStepUuid)
            .then(res => {
                return fetchData()
            })
    }

    function buildTitle(item) {
        return <>
            {item.title || ''}

            <Can I="do" a="acl:lab_internal_info">
                &nbsp;
                {item.note
                    ?
                    <Popover
                        content={item.note}
                        overlayStyle={{ maxWidth: '300px' }}
                    >
                        <span style={{fontSize: "1.2em"}}><IconIoIosInformationCircleOutline /></span>
                    </Popover>
                    : ''}
            </Can>
        </>
    }

    function buildDescription(item) {
        return <div className='text-small-08'>
            {item.subTitle || ''}
            <br />
            {item.createdBy || ''}
        </div>
    }

    function buildIcon(item, index) 
    {
        if (item.status === 'begin') {
            return <IconAiOutlineRightCircle />
        }

        if (item.status === 'end'){
            if (config.nominationActiveStatuses.indexOf(props.nominationStatusId) > -1) {
                return <IconAiOutlineEllipsis />
            }
            if (props.nominationStatusId === config.nominationStatuses.completed.id) {
                return <IconAiOutlineCheck />
            }
            return <IconAiOutlineStop />
        }

        let iconClassName = isAllowedToAction(index)
                                && index !== 0 && index !== (workflowSteps.length - 1)
                                ? 'workflow-step-has-action'
                                : ''

        if (item.status === 'finish') {
            return <Popconfirm
                className={iconClassName}
                disabled={!isAllowedToAction(index)}
                title="Are you sure to uncheck this step?"
                // title={<>Are you sure to uncheck this step?<br/>(Will uncheck all following in any)</>}
                onConfirm={() => onChange(index)}
            >
                <IconAiOutlineCheckCircle />
            </Popconfirm>
        }
        
        
        return <Popconfirm
            className={iconClassName}
            disabled={!isAllowedToAction(index)}
            overlayClassName="popconfirm-change-status-above-menu"
            title={
                <form>
                    <div className="form-group">
                        <label>Notes:</label>
                        <br />
                        <textarea ref={statusChangeReasonRef} rows={4}></textarea>
                    </div>
                </form>
            }
            onConfirm={async () => {
                let note = statusChangeReasonRef.current.value
                return onChange(index, note)
            }}
        >
            <IconIoIosRadioButtonOff /> 
        </Popconfirm>
    }

    if (props.nominationStatusId === config.nominationStatuses.draft.id) {
        return '';
    }

    return (
        <div >
            <Can I="do" a="acl:nominations/manage">
                <div className='workflow-steps-section'>
                    <Steps current={current} size='small' labelPlacement="vertical" >
                        {
                            workflowSteps.map((item, index) =>
                                <Step
                                    key={item.stepKey}
                                    title={buildTitle(item)}
                                    description={buildDescription(item)}
                                    status={item.status}
                                    disabled={item.disabled}
                                    icon={buildIcon(item, index)}
                                />
                            )
                        }
                    </Steps>
                </div>
            </Can>
        </div>
    )
}

export default connect()(NominationWorkflowSteps)