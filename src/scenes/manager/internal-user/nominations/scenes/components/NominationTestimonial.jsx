import React, { useState, useEffect } from 'react'
import { IoIosAddCircleOutline as IconIoIosAddCircleOutline } from 'react-icons/io'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import NominationTestimonialNewEditForm, { NOMINATION_TESTIMONIAL_FORM_ID } from './NominationTestimonialNewEditForm';
import nominationService from '../../nominationService';
import permissionAbility, { Can } from 'src/_helpers/permission';
import { connect } from 'react-redux'
import { reset as resetForm, reset } from 'redux-form'
import config from 'src/config';
import moment from 'moment';
import ActionButtonsGroup from 'src/_components/pageElements/ActionButtonsGroup';
import { Divider } from 'antd';

const NominationTestimonial = props => {

    let [editing, setEditing] = useState({
        isEditing: false,
        isEditingId: null
    })
    let [testimonialCollection, setTestimonialCollection] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const res = await nominationService.cgetTestimonials(props.nominationId);
        setTestimonialCollection(res.data);
        return res
    }

    function fetchNominationData() {
        props.fetchNominationData()
    }

    function toggleIsEditingState(toggleValue, toggleId) {
        if (toggleValue === undefined) {
            toggleValue = !isEditing
        }
        if (toggleId == undefined) {
            toggleId = null
        }

        setEditing({
            isEditing: toggleValue,
            isEditingId: toggleId
        })
    }

    function createTestimonialRecord(value) {
        return nominationService.createTestimonialRecord(props.nominationId, value)
            .then(res => {
                return fetchData().then(() => {
                    toggleIsEditingState(false)
                    fetchNominationData()
                    return props.dispatch(resetForm(NOMINATION_TESTIMONIAL_FORM_ID))
                })
            })
    }

    function deleteTestimonialRecord(testimonialId) {
        return nominationService.deleteTestimonialRecord(props.nominationId, testimonialId)
            .then(res => {
                fetchNominationData()
                return fetchData()
            })
    }

    function saveTestimonialRecord(testimonialId, value) {
        return nominationService.updateTestimonialRecord(props.nominationId, testimonialId, value)
            .then(res => {
                return fetchData().then(res2 => {
                    toggleIsEditingState(false)
                    return props.dispatch(resetForm(NOMINATION_TESTIMONIAL_FORM_ID))
                })
            })
    }

    return (
        <Row>
            <Col span={14} offset={5}>
            <Can I='do' a='acl:nominations/manage'>
                {
                    editing.isEditing && editing.isEditingId === null
                        ? <NominationTestimonialNewEditForm
                            onSubmit={createTestimonialRecord}
                            onClose={() => toggleIsEditingState(false)}
                        />
                        :
                        <div className="text-center mg-b-10">
                            <a key={`add-new-testimonial`} onClick={() => toggleIsEditingState(true)}>
                                <Icon component={IconIoIosAddCircleOutline} />Add Testimonial
                            </a>
                        </div>
                }
            </Can>
            {
                testimonialCollection.map((rec, index) => {
                    return <div key={`${index}`}>
                        {
                            editing.isEditing && editing.isEditingId === rec.uuid && permissionAbility.can('do', 'acl:nominations/manage')
                                ?
                                <NominationTestimonialNewEditForm
                                    className="p-t-10"
                                    onSubmit={(values) => saveTestimonialRecord(rec.uuid, values)}
                                    onClose={() => toggleIsEditingState(false)}
                                    initialValues={{
                                        content: rec.data.content,
                                        user: rec.data.user,
                                        position: rec.data.position
                                    }}
                                />
                                :
                                <>
                                    <div className="pull-left" style={{ width: "90%" }}>
                                        <p dangerouslySetInnerHTML={{ __html: rec.data.content.replace(/\n/g, "<br />") }} />
                                        <div className="text-right text-small-09 text-italic">--{rec.data.user} <br /> {rec.data.position}</div>
                                    </div>
                                    <div className="pull-right mg-r-10 text-right">
                                        {
                                            Math.abs(moment(rec.createdAt).unix() - moment().unix()) <= config.testimonialRecordModifyDelay
                                                && permissionAbility.can('do', 'acl:nominations/manage')
                                                ?
                                                <div>
                                                    <ActionButtonsGroup
                                                        itemId={rec.uuid}
                                                        onEdit={() => toggleIsEditingState(true, rec.uuid)}
                                                        onDelete={() => deleteTestimonialRecord(rec.uuid)}
                                                    />
                                                </div>
                                                : ''
                                        }
                                    </div>
                                </>
                        }
                        <div className="clearfix" />
                        <Divider />
                    </div>
                })
            }
            </Col>
        </Row>
    )
}

export default connect()(NominationTestimonial)