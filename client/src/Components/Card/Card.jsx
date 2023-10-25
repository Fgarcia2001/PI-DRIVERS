import React from "react";
import style from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={style.cardContainer}>
      <p className={style.nombre}>{props.name}</p>
      <img src={props.image} className={style.image} />
      <p className={style.teams}> TEAMS </p>

      {props.teams ? (
        <p className={style.allteams}>{props.teams}</p>
      ) : (
        <p className={style.allteams}>No tiene teams</p>
      )}
    </div>
  );
};

export default Card;
