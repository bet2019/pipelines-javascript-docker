import { SubmissionError } from "redux-form";
import _ from "lodash";
import { FORM_ERROR } from "final-form";

function deepen(o) { // from https://stackoverflow.com/a/7794127/3419751
  var oo = {}, t, parts, part;
  for (var k in o) {
    t = oo;
    parts = k.split(".");
    var key = parts.pop();
    while (parts.length) {
      part = parts.shift();
      t = t[part] = t[part] || {};
    }
    t[key] = o[k];
  }
  return oo;
}

export default class FormSubmissionError {
  constructor(data) {
    let errors = {};
    _.map(data.details, (object) => {
        errors[object.path.join('.')] = object.message
    });
    errors = deepen(errors)
    /** @deprecated as redux-form usage is deprecated */
    return new SubmissionError(errors);
  }
}

export const toFinalFormStyle = (errors) => {

  if (errors.constructor === SubmissionError) {
    // BC for redux-form
    errors = errors.errors
  }

  let finalFormStyle = {
    ...errors
  }
  // if (!Boolean(errors) || errors.length == 0) {
  //   finalFormStyle[FORM_ERROR] = 
  // }

  return finalFormStyle
}
