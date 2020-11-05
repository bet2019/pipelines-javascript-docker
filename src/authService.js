import api from "src/_helpers/api";
import Routing from "src/_helpers/routing";

const authService = {
  bootstrap
}

function bootstrap() {
  return api.get(Routing.generate('routes.api.bootstrap'))
}

export default authService