import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
const Landing = () => {
  return (
    <div className={style.landing}>
      <div className={style.container}>
        <p className={style.welcome}>Welcome!</p>
        <Link to="/home" className={style.button}>
          HOME
        </Link>
      </div>
    </div>
  );
};

export default Landing;
