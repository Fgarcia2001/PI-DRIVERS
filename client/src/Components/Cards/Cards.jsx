import React from "react";
import style from "./Cards.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../redux/actions";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
const Cards = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.allDrivers);

  useEffect(() => {
    dispatch(getDrivers(drivers));
  }, [dispatch]);

  return (
    <div className={style.cards}>
      {drivers.map((driver) => {
        return (
          <Link key={driver.id} to={`/detail/${driver.id}`}>
            <Card
              name={driver.name}
              image={driver.image}
              teams={driver.teams}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;
