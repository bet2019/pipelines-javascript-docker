import api from "src/_helpers/api";
import Routing, { routesAPI } from "src/_helpers/routing";

const nominationService = {
  get(id, params = {}) {
    return api.get(Routing.generate(routesAPI.internal.nominations.get, {nominationId: id}), {params})
  },
  getStatusHistory(id) {
    return api.get(Routing.generate(routesAPI.internal.nominations.getStatusHistory, {nominationId: id}))
  },
  remove(id) {
    return api.delete(Routing.generate(routesAPI.internal.nominations.delete, {nominationId: id}))
  },
  create(values) {
    return api.post(Routing.generate(routesAPI.internal.nominations.post), values)
  },
  update(id, values) {
    return api.patch(Routing.generate(routesAPI.internal.nominations.patch, {nominationId: id}), values)
  },
  duplicate(id) {
    return api.put(Routing.generate(routesAPI.internal.nominations.duplicate, {nominationId: id}))
  },
  cgetFollowupRecord(nominationId) {
    return api.get(Routing.generate(routesAPI.internal.nominations.followup.cget, {nominationId}))
  },
  removeFollowupRecord(nominationId, followupId) {
    return api.delete(Routing.generate(routesAPI.internal.nominations.followup.delete, {nominationId, followupId}))
  },
  createFollowupRecord(nominationId, values) {
    return api.post(Routing.generate(routesAPI.internal.nominations.followup.post, {nominationId}), values)
  },
  updateFollowupRecord(nominationId, followupId, values) {
    return api.patch(Routing.generate(routesAPI.internal.nominations.followup.patch, {nominationId, followupId}), values)
  },
  cgetTestimonials(nominationId) {
    return api.get(Routing.generate(routesAPI.internal.nominations.testimonial.cget, {nominationId}))
  },
  createTestimonialRecord(nominationId, value) {
    return api.post(Routing.generate(routesAPI.internal.nominations.testimonial.post, {nominationId}), value)
  },
  deleteTestimonialRecord(nominationId, testimonialId){
    return api.delete(Routing.generate(routesAPI.internal.nominations.testimonial.delete, {nominationId, testimonialId}))
  },
  updateTestimonialRecord(nominationId, testimonialId, value){
    return api.patch(Routing.generate(routesAPI.internal.nominations.testimonial.patch, {nominationId, testimonialId}), value)
  },
  cgetWorkflowSteps(nominationId){
    return api.get(Routing.generate(routesAPI.internal.nominations.workflowSteps.cget, {nominationId}))
  },
  deleteWorkflowStep(nominationId, workflowStepId){
    return api.delete(Routing.generate(routesAPI.internal.nominations.workflowSteps.delete, {nominationId, workflowStepId}))
  },
  createWorkflowStep(nominationId, value){
    return api.post(Routing.generate(routesAPI.internal.nominations.workflowSteps.post, {nominationId}), value)
  }
}

export default nominationService
