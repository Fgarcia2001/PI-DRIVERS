import {
  GET_DRIVERS,
  GET_DRIVER_ID,
  GET_DRIVER_NAME,
  GET_TEAMS,
  POST_DRIVER,
  FILTER_BY_TEAM,
  FILTER_BY_ORIGEN,
  ALPHABETIC_ORDER,
  BIRTHDATE_ORDER,
  CLEAR_DETAIL,
  PAGINATE,
  FILTER,
} from "./types";

const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  teams: [],
  detail: {},
  currentPage: 0,
};

const rootReducer = (state = initialState, action) => {
  const items_x_page = 9;
  const { type, payload } = action;
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: [...payload].splice(0, items_x_page),
        allDriversCopy: payload,
      };
    case GET_DRIVER_NAME:
      return {
        ...state,
        allDrivers: payload.splice(0, items_x_page),
      };
    case GET_DRIVER_ID:
      return {
        ...state,
        detail: payload,
      };

    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: {},
      };
    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        payload === "next"
          ? next_page * items_x_page
          : prev_page * items_x_page;
      if (payload === "next" && firstIndex >= state.allDriversCopy.length)
        return state;
      else if (payload === "prev" && prev_page < 0) return state;
      return {
        ...state,
        allDrivers: [...state.allDriversCopy].splice(firstIndex, items_x_page),
        currentPage: payload === "next" ? next_page : prev_page,
      };
    case FILTER:
      switch (payload) {
        case "AZ":
          let asc = [...state.allDriversCopy].sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          return {
            ...state,
            allDrivers: [...asc].splice(0, items_x_page),
            allDriversBackup: asc,
            currentPage: 0,
          };

        case "ZA":
          let desc = [...state.allDriversCopy].sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          return {
            ...state,
            allDrivers: [...desc].splice(0, items_x_page),
            allDriversCopy: desc,
            currentPage: 0,
          };
        case "jovenes":
          let jovenes = [...state.allDriversCopy];

          return {
            ...state,
            allDrivers: [...jovenes].slice(0, items_x_page).sort((a, b) => {
              if (a.birthdate < b.birthdate) return 1;
              if (a.birthdate > b.birthdate) return -1;
              return 0;
            }),
          };
        case "grandes":
          let grandes = [...state.allDriversCopy];
          return {
            ...state,
            allDrivers: [...grandes].slice(0, items_x_page).sort((a, b) => {
              if (a.birthdate < b.birthdate) return -1;
              if (a.birthdate > b.birthdate) return 1;
              return 0;
            }),
          };
        default:
          state;
          break;
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
