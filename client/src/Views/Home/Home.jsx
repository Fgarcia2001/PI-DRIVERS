import React from "react";
import Cards from "../../Components/Cards/Cards";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  getTeams,
  page,
  orderAlphabetic,
  orderBirthdate,
  filterByOrigin,
  filterByTeam,
} from "../../redux/actions";
const Home = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.teams);

  useEffect(() => {
    if (!drivers.length) {
      dispatch(getDrivers());
    }
    dispatch(getTeams());
  }, []);

  const pagination = (event) => {
    dispatch(page(event.target.name));
  };

  const getAllDrivers = () => {
    dispatch(getDrivers());
  };
  const alphabetic = (event) => {
    dispatch(orderAlphabetic(event.target.value));
  };
  const birthdate = (event) => {
    dispatch(orderBirthdate(event.target.value));
  };

  const filterOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };
  const filterTeam = (event) => {
    dispatch(filterByTeam(event.target.value));
  };
  return (
    <div>
      <div>
        <label>Ordenamiento</label>
        <select name="order" onChange={alphabetic}>
          <option value="AZ" key="AZ">
            A-Z
          </option>
          <option value="ZA" key="ZA">
            Z-A
          </option>
        </select>
        <select name="order" onChange={birthdate}>
          <option value="jovenes" key="jovenes">
            Mas jovenes
          </option>
          <option value="grandes" key="grandes">
            Mas grandes
          </option>
        </select>
      </div>
      <div>
        <label>Filtros</label>
        <select name="filter" onChange={filterOrigin}>
          <option value="existentes" key="existentes">
            Ya existentes
          </option>
          <option value="creados" key="creados">
            Creados
          </option>
        </select>
        <select name="teams" onChange={filterTeam}>
          {allTeams.map((team) => {
            return (
              <option value={team} key={team}>
                {team}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button onClick={getAllDrivers}>RESET</button>
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
