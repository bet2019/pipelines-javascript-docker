export const appConstants = {
  BOOTSTRAP_REQUEST: "BOOTSTRAP_REQUEST",
  BOOTSTRAP_SUCCESS: "BOOTSTRAP_SUCCESS",
  BOOTSTRAP_FAILURE: "BOOTSTRAP_FAILURE",

  FLASH_MESSAGE_SUCCESS: "FLASH_MESSAGE_SUCCESS",
  FLASH_MESSAGE_WARNING: "FLASH_MESSAGE_WARNING",
  FLASH_MESSAGE_FAILURE: "FLASH_MESSAGE_FAILURE",
  FLASH_MESSAGE_INFO:    "FLASH_MESSAGE_INFO",
  FLASH_MESSAGE_CLOSED:  "FLASH_MESSAGE_CLOSED",

  FLASH_MESSAGES_FLUSH: "FLASH_MESSAGES_FLUSH",

  APP_PAGE_TITLE_UPDATED: "APP_PAGE_TITLE_UPDATED"
}


const initialState = {
  currentPageTitle: null,
  isBootstrapped: false,
  labs: [],
  nominationSources: [],
  msftProducts: {},
  countriesDictionary: {},
  flashBag: {
    success: [],
    warning: [],
    failure: [],
    info: []
  }  
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case appConstants.BOOTSTRAP_SUCCESS:
      return {
        ...state,
        isBootstrapped: true,
        labs: action.payload.labs,
        nominationSources: action.payload.nominationSources,
        nominationStatuses: action.payload.nominationStatuses,
        msftProducts: action.payload.msftProducts,
        countriesDictionary: action.payload.countriesDictionary,
        industryVerticals: action.payload.industryVerticals,
      };

    case appConstants.FLASH_MESSAGE_SUCCESS:
      var flashBag = { ...state.flashBag };
      flashBag.success.push(action.payload);
      return {
        ...state,
        flashBag: flashBag
      };

    case appConstants.FLASH_MESSAGE_WARNING:
      var flashBag = { ...state.flashBag };
      flashBag.warning.push(action.payload);
      return {
        ...state,
        flashBag: flashBag
      };

    case appConstants.FLASH_MESSAGE_FAILURE:
      var flashBag = { ...state.flashBag };
      flashBag.failure.push(action.payload);
      return {
        ...state,
        flashBag: flashBag
      };

    case appConstants.FLASH_MESSAGE_INFO:
      var flashBag = { ...state.flashBag };
      flashBag.info.push(action.payload);
      return {
        ...state,
        flashBag: flashBag
      };

    case appConstants.FLASH_MESSAGE_CLOSED:
      var flashBag = { ...state.flashBag };

      _.forOwn(flashBag, (item, key) => {
        if (item.length > 0) {
          flashBag[key] = [...item.filter((mes) => {
            return mes.id !== action.payload.id;
          })
          ];
        }
      });

      return {
        ...state,
        flashBag: flashBag
      };

    case appConstants.FLASH_MESSAGES_FLUSH:
      var flashBag = { ...state.flashBag };

      if (action.payload.type && flashBag[action.payload.type]) {
        flashBag[action.payload.type] = [];
      } else {
        flashBag = _.forOwn(flashBag, (item, key) => {
            flashBag[key] = [];
          }
        );
      }

      return {
        ...state,
        flashBag: flashBag
      };

    case appConstants.APP_PAGE_TITLE_UPDATED:
      return {
        ...state,
        currentPageTitle: action.payload
      };          

    default:
      return state;
  }
}
