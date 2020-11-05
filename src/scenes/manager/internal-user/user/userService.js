import api from "src/_helpers/api";
import Routing from "src/_helpers/routing";

const userService = {
  fetchUserData,
  deleteUser,
  createNewUser,
  update
}

function createNewUser(values) {
  return api.post(Routing.generate('routes.api.internal.users.post'), values)
}

function fetchUserData(uuid) {
  return api.get(Routing.generate('routes.api.internal.users.get', {userUuid: uuid}))
}

function deleteUser(uuid) {
  return api.delete(Routing.generate('routes.api.internal.users.delete', {userUuid: uuid}))
}

function update(uuid, values) {
  return api.patch(Routing.generate('routes.api.internal.users.patch', {userUuid: uuid}), values)
}

export default userService
