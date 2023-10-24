import React from "react";
import Cards from "../../Components/Cards/Cards";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams, page, driverFilters } from "../../redux/actions";
const Home = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.teams);

  useEffect(() => {
    if (!drivers.length) {
      dispatch(getDrivers());
    }
    dispatch(getTeams());
  }, [dispatch]);

  useEffect(() => {}, []);
  useEffect(() => {}, [drivers]);
  const pagination = (event) => {
    dispatch(page(event.target.name));
  };

  const filters = (event) => {
    dispatch(driverFilters(event.target.value));
  };
  const getAllDrivers = () => {
    dispatch(getDrivers());
  };
  return (
    <div>
      <div>
        <label>Ordenamiento</label>
        <select name="order" onChange={filters}>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
        <select name="order" onChange={filters}>
          <option value="jovenes">Mas jovenes</option>
          <option value="grandes">Mas grandes</option>
        </select>
      </div>
      <div>
        <button onClick={getAllDrivers}>GET ALL DRIVERS</button>
      </div>
      <div>
        <label>Paginado</label>
        <button name="prev" onClick={pagination}>
          Prev
        </button>
        <button name="next" onClick={pagination}>
          Next
        </button>
      </div>
      <Cards />
    </div>
  );
};

export default Home;
