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
} from "./types";

const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  myDrivers: [],
  teams: [],
  posts: [],
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
    case GET_DRIVER_ID:
      return {
        ...state,
        detail: payload,
      };
    case GET_DRIVER_NAME:
      return {
        ...state,
        allDrivers: payload,
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

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
