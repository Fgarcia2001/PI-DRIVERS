import React, { useEffect } from "react";
import style from "./Cards.module.css";

import { useSelector } from "react-redux";

import Card from "../Card/Card";
import { Link } from "react-router-dom";
const Cards = () => {
  const drivers = useSelector((state) => state.allDrivers);

  return (
    <div className={style.cards}>
      {drivers.length ? (
        drivers.map((driver) => (
          <Link
            className={style.card}
            key={driver.id}
            to={`/detail/${driver.id}`}
          >
            <Card
              name={driver.name}
              image={driver.image}
              teams={driver.teams}
            />
          </Link>
        ))
      ) : (
        <h2 className={style.ninguno}>Not found anywhere result</h2>
      )}
    </div>
  );
};

export default Cards;
