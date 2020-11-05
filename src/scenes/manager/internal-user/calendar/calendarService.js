import api from "src/_helpers/api";
import Routing, { routesAPI } from "src/_helpers/routing";

const calendarService = {
  loadNominationsEvents(filter = {}) {
    return api.get(Routing.generate(routesAPI.internal.calendar.nominationEvents), {params: filter})
  }
}

export default calendarService
