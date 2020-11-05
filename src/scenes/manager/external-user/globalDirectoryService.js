import api from "src/_helpers/api";
import Routing from "src/_helpers/routing";

//FIXME: move this file higher in a file structure, it is reusable between components

const globalDirectoryService = {
  list
}

function list(scope) {
  return api.get(Routing.generate('routes.api.externalUser.globalDirectory.cget', {gdScope: scope}))
}

export default globalDirectoryService
