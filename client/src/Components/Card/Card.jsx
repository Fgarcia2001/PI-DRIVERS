import React from "react";
import style from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={style.cardContainer}>
      <p>Nombre: {props.name}</p>
      <img src={props.image} className={style.image} />
      <p>Teams: {props.teams}</p>
    </div>
  );
};

export default Card;
