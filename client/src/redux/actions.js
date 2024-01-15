import {
  GET_DRIVERS,
  GET_DRIVER_ID,
  GET_DRIVER_NAME,
  GET_TEAMS,
  POST_DRIVER,
  CLEAR_DETAIL,
  PAGINATE,
  ALPHABETIC_ORDER,
  BIRTHDATE_ORDER,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEAM,
  GET_NATIONALITIES,
} from "./types";
import axios from "axios";

const URL_DRIVERS = "http://localhost:3001/drivers";

const getDrivers = () => {
  return async (dispatch) => {
    try {
      const drivers = (await axios(`${URL_DRIVERS}`)).data;
      dispatch({ type: GET_DRIVERS, payload: drivers });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDriverId = (id) => {
  return async (dispatch) => {
    try {
      const driver = (await axios(`${URL_DRIVERS}/${id}`)).data;
      dispatch({ type: GET_DRIVER_ID, payload: driver });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDriverName = (driver) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_DRIVERS}?name=${driver}`);
      dispatch({ type: GET_DRIVER_NAME, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const getTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/teams");
      dispatch({ type: GET_TEAMS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const postDriver = (state) => {
  return async () => {
    try {
      const response = await axios.post(`${URL_DRIVERS}`, state);
      alert(`${response.data}`);
    } catch (error) {
      alert("Error al crear el driver");
    }
  };
};

const clearDetail = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DETAIL,
    });
  };
};

const page = (order) => {
  return (dispatch) => {
    dispatch({
      type: PAGINATE,
      payload: order,
    });
  };
};

const orderAlphabetic = (value) => {
  return (dispatch) => {
    dispatch({
      type: ALPHABETIC_ORDER,
      payload: value,
    });
  };
};

const orderBirthdate = (value) => {
  return (dispatch) => {
    dispatch({
      type: BIRTHDATE_ORDER,
      payload: value,
    });
  };
};
const filterByOrigin = (value) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: value,
    });
  };
};

const filterByTeam = (value) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_TEAM,
      payload: value,
    });
  };
};

const getNationalities = () => {
  return async (dispatch) => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    dispatch({
      type: GET_NATIONALITIES,
      payload: response.data,
    });
  };
};
export {
  getDrivers,
  getDriverId,
  getDriverName,
  getTeams,
  postDriver,
  clearDetail,
  page,
  orderAlphabetic,
  orderBirthdate,
  filterByOrigin,
  filterByTeam,
  getNationalities,
};
