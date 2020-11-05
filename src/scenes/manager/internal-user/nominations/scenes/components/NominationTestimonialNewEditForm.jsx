import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import { Field, reset as resetForm, submit, reduxForm } from 'redux-form'
import Button from 'antd/lib/button'
import validationConstraints from 'src/_helpers/validationConstraints';
import { connect } from 'react-redux'

export const NOMINATION_TESTIMONIAL_FORM_ID = 'nomination-testimonial-form-id'

class NominationTestimonialNewEditForm extends FormMixin(React.Component) {

    componentDidMount = () => {
        this.props.dispatch(resetForm(NOMINATION_TESTIMONIAL_FORM_ID))
    }

    render() {
        const { handleSubmit, pristine, invalid, submitting } = this.props

        return (
            <div className={this.props.className}>
                <form layout="inline">
                    <Field
                        className="form-group"
                        name="content"
                        component={this.renderTextAreaField}
                        rows={5}
                        required={true}
                        validate={[validationConstraints.required]}
                        placeholder="Testimonial content"
                        label="Content"
                    />
                    <div className="input-inline-width-100">
                        <Field
                            className="form-group"
                            name="user"
                            component={this.renderInputField}
                            required={true}
                            validate={[validationConstraints.required]}
                            placeholder="Person's Name"
                            label="Person's Name"
                        />

                        <Field
                            className="form-group"
                            name="position"
                            component={this.renderInputField}
                            required={true}
                            validate={[validationConstraints.required]}
                            placeholder="Person's Position"
                            label="Person's Position"
                        />
                    </div>
                    <div className="form-default-action-btn mg-t-10 text-right">
                        <Button
                            type="primary"
                            disabled={pristine || invalid || submitting}
                            onClick={() =>
                                this.props.dispatch(submit(NOMINATION_TESTIMONIAL_FORM_ID))
                            }
                        >Save</Button>
                        <Button onClick={() => this.props.onClose()}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

NominationTestimonialNewEditForm = reduxForm({
    form: NOMINATION_TESTIMONIAL_FORM_ID
})(NominationTestimonialNewEditForm)

export default connect()(NominationTestimonialNewEditForm)