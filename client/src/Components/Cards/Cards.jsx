import React from "react";
import style from "./Cards.module.css";

import { useSelector } from "react-redux";

import Card from "../Card/Card";
import { Link } from "react-router-dom";
const Cards = () => {
  const drivers = useSelector((state) => state.allDrivers);

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
