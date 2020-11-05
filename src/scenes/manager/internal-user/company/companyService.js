import api from "src/_helpers/api";
import Routing from "src/_helpers/routing";

const companyService = {
  get,
  update
}

function get(id) {
  return api.get(Routing.generate('routes.api.internal.companies.get', {companyId: id}))
}

function update(id, values) {
  return api.patch(Routing.generate('routes.api.internal.companies.patch', {companyId: id}), values)
}

export default companyService
