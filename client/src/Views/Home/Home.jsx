import React, { useState } from "react";
import Cards from "../../Components/Cards/Cards";
import style from "./Home.module.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  getTeams,
  page,
  getDriverName,
  orderAlphabetic,
  orderBirthdate,
  filterByOrigin,
  filterByTeam,
} from "../../redux/actions";
const Home = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.teams);
  const location = useLocation();
  const driverCreado = location.search.includes("from=driverCreado");

  useEffect(() => {
    if (driverCreado) {
      dispatch(getDriverName(location.state.name));
    } else {
      if (!drivers.length) {
        dispatch(getDrivers());
      }
      dispatch(getTeams());
    }
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
    <div className={style.homeContainer}>
      <div className={style.options}>
        <div className={style.acomodo}>
          <div className={style.boxs}>
            <label className={style.label}>Filters</label>
            <select
              name="filter"
              onChange={filterOrigin}
              className={style.selector}
            >
              <option value="existentes" key="existentes">
                Existing
              </option>
              <option value="creados" key="creados">
                Created
              </option>
            </select>
            <select
              name="teams"
              onChange={filterTeam}
              className={style.selector}
            >
              {allTeams.map((team) => {
                return (
                  <option value={team} key={team}>
                    {team}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={style.boxs}>
            <label className={style.label}>Orders</label>
            <select
              name="order"
              onChange={alphabetic}
              className={style.selector}
            >
              <option value="AZ" key="AZ">
                A-Z
              </option>
              <option value="ZA" key="ZA">
                Z-A
              </option>
            </select>
            <select
              name="order"
              onChange={birthdate}
              className={style.selector}
            >
              <option value="jovenes" key="jovenes">
                Age - +
              </option>
              <option value="grandes" key="grandes">
                Age + -
              </option>
            </select>
          </div>
          <div>
            <button onClick={getAllDrivers} className={style.reset}>
              RESET
            </button>
          </div>
          <div>
            <button
              name="prev"
              onClick={pagination}
              className={style.flechasIzq}
            >
              {"<=="}
            </button>
            <button
              name="next"
              onClick={pagination}
              className={style.flechasDer}
            >
              {"==>"}
            </button>
          </div>
        </div>
      </div>

      <Cards />
    </div>
  );
};

export default Home;
