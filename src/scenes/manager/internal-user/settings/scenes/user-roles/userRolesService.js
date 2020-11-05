import api from "src/_helpers/api";
import Routing from "src/_helpers/routing";

const userRolesService = {
  get,
  create,
  update,
  remove,
  getSupportedPermissionMap
}

function getSupportedPermissionMap() {
  return api.get(Routing.generate('routes.api.internal.userRoles.cgetSupportedPermission'))
}

function create(values) {
  return api.post(Routing.generate('routes.api.internal.userRoles.post'), values)
}

function get(id) {
  return api.get(Routing.generate('routes.api.internal.userRoles.get', {roleId: id}))
}

function remove(id) {
  return api.delete(Routing.generate('routes.api.internal.userRoles.delete', {roleId: id}))
}

function update(id, values) {
  return api.patch(Routing.generate('routes.api.internal.userRoles.patch', {roleId: id}), values)
}

export default userRolesService
