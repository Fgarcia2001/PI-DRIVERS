import {
  GET_DRIVERS,
  GET_DRIVER_ID,
  GET_DRIVER_NAME,
  GET_TEAMS,
  POST_DRIVER,
  CLEAR_DETAIL,
  PAGINATE,
} from "./types";
import axios from "axios";

const URL_DRIVERS = "http://localhost:3001/drivers";

const getDrivers = () => {
  return async (dispatch) => {
    try {
      const drivers = (await axios(`${URL_DRIVERS}`)).data;
      console.log(drivers);
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

/* const postDriver = (state) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL_DRIVERS}`, state);
      dispatch({
        type: POST_DRIVER,
        payload: state,
      });
      alert(`${response.data}`);
    } catch (error) {
      alert("Error al crear el driver");
    }
  };
}; */

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

export {
  getDrivers,
  getDriverId,
  getDriverName,
  getTeams,
  /* postDriver, */
  clearDetail,
  page,
};
