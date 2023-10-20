import { GET_DRIVERS, GET_DRIVER_ID, GET_DRIVER_NAME } from "./types";
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

export { getDrivers, getDriverId, getDriverName };
