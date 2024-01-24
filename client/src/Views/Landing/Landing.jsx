import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import rueda from "../../images/rueda.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getDrivers } from "../../redux/actions";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers());
  }, []);
  return (
    <div className={style.landing}>
      <div className={style.title}>
        <h2 className={style.welcome}>Welcome Formula 1 SPA</h2>

        <h2 className={style.press}>
          <FontAwesomeIcon icon={faArrowRight} className={style.flecha} />
          PRESS
          <FontAwesomeIcon icon={faArrowRight} className={style.flecha} />
        </h2>
      </div>
      <Link to="/home" className={style.rueda}>
        <img src={rueda} alt="rueda" className={style.imagen} />
      </Link>
    </div>
  );
};

export default Landing;
