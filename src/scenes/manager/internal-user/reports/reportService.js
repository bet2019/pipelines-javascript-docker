import api from "src/_helpers/api";
import Routing, { routesAPI } from "src/_helpers/routing";

const reportService = {
  getCustomerProductFeedback,
  getSubmittedCompletedStatistics,
  getCompletedSummary,
  getUpcomingNominations,
  getPowerBiReportConfig,

  getInternalProductFeedbackCollection,
  postInternalProductFeedback,
  putInternalProductFeedback,
  deleteInternalProductFeedback,
}

function getCustomerProductFeedback(filterData) {
  let config = {params: {filter: filterData}}
  if (filterData.export2xlsx) {
    config.responseType = 'blob'
  }
  return api.get(Routing.generate(routesAPI.internal.reports.customerProductFeedback), config)
}

function getInternalProductFeedbackCollection(filterData = {}) {
  let config = {params: {filter: filterData}}
  if (filterData.export2xlsx) {
    config.responseType = 'blob'
  }
  return api.get(Routing.generate(routesAPI.internal.reports.internalProductFeedback.cget), config)
}

function postInternalProductFeedback(values) {
  return api.post(Routing.generate(routesAPI.internal.reports.internalProductFeedback.post), values)
}

function putInternalProductFeedback(uuid, values) {
  return api.put(Routing.generate(routesAPI.internal.reports.internalProductFeedback.put, {internalProductFeedbackUuid: uuid}), values)
}

function deleteInternalProductFeedback(uuid) {
  return api.delete(Routing.generate(routesAPI.internal.reports.internalProductFeedback.delete, {internalProductFeedbackUuid: uuid}))
}

function getSubmittedCompletedStatistics(filterData) {
  let config = {params: {filter: filterData}}
  return api.get(Routing.generate(routesAPI.internal.reports.submittedCompletedNominationsStat), config)
}

function getCompletedSummary(filterData) {
  let config = {params: {filter: filterData}}
  if (filterData.export2xlsx) {
    config.responseType = 'blob'
  }
  return api.get(Routing.generate(routesAPI.internal.reports.completedNominationsSummary), config)
}

function getUpcomingNominations(filterData) {
  let config = {params: {filter: filterData}}
  if (filterData.export2xlsx) {
    config.responseType = 'blob'
  }
  return api.get(Routing.generate(routesAPI.internal.reports.upcomingNominations), config)
}

function getPowerBiReportConfig(urlParams = {}) {
  return api.get(Routing.generate(routesAPI.internal.reports.getPowerBiReportConfig), urlParams)
}


export default reportService
