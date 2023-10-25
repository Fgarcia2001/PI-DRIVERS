import {
  GET_DRIVERS,
  GET_DRIVER_ID,
  GET_DRIVER_NAME,
  GET_TEAMS,
  CLEAR_DETAIL,
  PAGINATE,
  ALPHABETIC_ORDER,
  BIRTHDATE_ORDER,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEAM,
} from "./types";

const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  teams: [],
  detail: {},
  driverFiltered: [],
  filters: false,
  currentPage: 0,
};

const rootReducer = (state = initialState, action) => {
  const items_x_page = 8;
  const { type, payload } = action;
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: [...payload].splice(0, items_x_page),
        allDriversCopy: payload,
        driverFiltered: [],
        filters: false,
        currentPage: 0,
      };
    case GET_DRIVER_NAME:
      console.log(payload);
      return {
        ...state,
        allDrivers: [...payload].splice(0, items_x_page),
        driverFiltered: payload,
        filters: true,
        currentPage: 0,
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

      if (state.filters) {
        if (payload === "next" && firstIndex >= state.driverFiltered.length)
          return state;
        else if (payload === "prev" && prev_page < 0) return state;
        return {
          ...state,
          allDrivers: [...state.driverFiltered].splice(
            firstIndex,
            items_x_page
          ),
          currentPage: payload === "next" ? next_page : prev_page,
        };
      }

      if (payload === "next" && firstIndex >= state.allDriversCopy.length)
        return state;
      else if (payload === "prev" && prev_page < 0) return state;
      return {
        ...state,
        allDrivers: [...state.allDriversCopy].splice(firstIndex, items_x_page),
        currentPage: payload === "next" ? next_page : prev_page,
      };
    case ALPHABETIC_ORDER:
      if (payload === "AZ") {
        let asc = [];
        if (state.filters) {
          asc = [...state.driverFiltered].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          return {
            ...state,
            allDrivers: [...asc].slice(0, items_x_page),
            driverFiltered: asc,
            currentPage: 0,
          };
        } else {
          asc = [...state.allDriversCopy].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          return {
            ...state,
            allDrivers: [...asc].slice(0, items_x_page),
            allDriversCopy: asc,
            currentPage: 0,
          };
        }
      } else {
        let dte = [];
        if (state.filters) {
          dte = [...state.driverFiltered].sort((a, b) => {
            if (
              a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") <
              b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
              return 1;
            if (
              a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") >
              b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
              return -1;
            return 0;
          });
          return {
            ...state,
            allDrivers: [...dte].slice(0, items_x_page),
            driverFiltered: dte,
            currentPage: 0,
          };
        } else {
          dte = [...state.allDriversCopy].sort((a, b) => {
            if (
              a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") <
              b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
              return 1;
            if (
              a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") >
              b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
              return -1;
            return 0;
          });
          return {
            ...state,
            allDrivers: [...dte].slice(0, items_x_page),
            allDriversCopy: dte,
            currentPage: 0,
          };
        }
      }
    case BIRTHDATE_ORDER:
      if (payload === "jovenes") {
        let jovenes = [];
        if (state.filters) {
          jovenes = [...state.allDrivers].sort((a, b) =>
            b.birthdate.localeCompare(a.birthdate)
          );
          return {
            ...state,
            allDrivers: [...jovenes].slice(0, items_x_page),
            driverFiltered: jovenes,
            currentPage: 0,
          };
        } else {
          jovenes = [...state.allDriversCopy].sort((a, b) =>
            b.birthdate.localeCompare(a.birthdate)
          );
          return {
            ...state,
            allDrivers: [...jovenes].slice(0, items_x_page),
            allDriversCopy: jovenes,
            currentPage: 0,
          };
        }
      } else {
        let grandes = [];
        if (state.filters) {
          grandes = [...state.driverFiltered].sort((a, b) =>
            a.birthdate.localeCompare(b.birthdate)
          );
          return {
            ...state,
            allDrivers: [...grandes].slice(0, items_x_page),
            driverFiltered: grandes,
            currentPage: 0,
          };
        } else {
          grandes = [...state.allDriversCopy].sort((a, b) =>
            a.birthdate.localeCompare(b.birthdate)
          );
          return {
            ...state,
            allDrivers: [...grandes].slice(0, items_x_page),
            allDriversCopy: grandes,
            currentPage: 0,
          };
        }
      }
    case FILTER_BY_ORIGIN:
      switch (payload) {
        case "creados":
          let creados = [...state.allDriversCopy].filter(
            (driver) => driver.created
          );

          return {
            ...state,
            allDrivers: [...creados].slice(0, items_x_page),
            driverFiltered: creados,
            currentPage: 0,
            filters: true,
          };
        case "existentes":
          let existentes = [...state.allDriversCopy].filter(
            (driver) => !driver.created
          );

          return {
            ...state,
            allDrivers: [...existentes].slice(0, items_x_page),
            driverFiltered: existentes,
            currentPage: 0,
            filters: true,
          };
        default:
          state;
      }

    case FILTER_BY_TEAM:
      let fltered = [...state.allDriversCopy].filter((driver) =>
        driver.teams?.includes(payload)
      );
      return {
        ...state,
        allDrivers: [...fltered].slice(0, items_x_page),
        driverFiltered: fltered,
        currentPage: 0,
        filters: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
