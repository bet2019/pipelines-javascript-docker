import api from "src/_helpers/api";
import Routing from "src/_helpers/routing";

//FIXME: move this file higher in a file structure, it is reusable between components

const globalDirectoryService = {
  remove,
  update,
  create,
  list
}

function list(scope) {
  return api.get(Routing.generate('routes.api.internal.globalDirectory.cget', {gdScope: scope}))
}

function create(scope, values) {
  return api.post(Routing.generate('routes.api.internal.globalDirectory.post', {gdScope: scope}), values)
}

function update(scope, id, values) {
  return api.patch(Routing.generate('routes.api.internal.globalDirectory.patch', {gdScope: scope, gdItemId: id}), values)
}

function remove(scope, id) {
  return api.delete(Routing.generate('routes.api.internal.globalDirectory.delete', {gdScope: scope, gdItemId: id}))
}

export default globalDirectoryService
