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
} from "./types";

const initialState = {
  allDrivers: [],
  driver: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: payload,
      };
    case GET_DRIVER_ID:
      return {
        ...state,
        driver: payload,
      };
    case GET_DRIVER_NAME:
      return {
        ...state,
        allDrivers: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
