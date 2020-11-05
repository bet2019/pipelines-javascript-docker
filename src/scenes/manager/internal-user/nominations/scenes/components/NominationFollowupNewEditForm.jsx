import React from 'react'
import FormMixin from 'src/_mixin/FormMixin';
import {Field, reset as resetForm, submit, reduxForm} from 'redux-form'
import Button from 'antd/lib/button'
import validationConstraints from 'src/_helpers/validationConstraints';
import {connect} from 'react-redux'

export const NOMINATION_FOLLOWUP_FORM_ID = 'nomination-followup-form-id'

class NominationFollowupNewEditForm extends FormMixin(React.Component) {

  componentDidMount = () => {
    this.props.dispatch(resetForm(NOMINATION_FOLLOWUP_FORM_ID))
  }

  render() {
    const {handleSubmit, pristine, invalid, submitting} = this.props

    return (
      <div className={this.props.className}>
        <form>
          <Field 
            name="notes"
            component={this.renderTextAreaField}
            rows={3}
            required={true}
            validate={[validationConstraints.required]}
          />

          <div className="form-default-action-btn mg-t-10 text-right">
            <Button
              type="primary"
              disabled={pristine || invalid || submitting}
              onClick={() =>
                this.props.dispatch(submit(NOMINATION_FOLLOWUP_FORM_ID))
              }
            >Save</Button>
            <Button onClick={()=>this.props.onClose()}>Cancel</Button>
          </div>
        </form>
      </div>
    )
  }
}

NominationFollowupNewEditForm = reduxForm({
  form: NOMINATION_FOLLOWUP_FORM_ID
})(NominationFollowupNewEditForm)

export default connect()(NominationFollowupNewEditForm)