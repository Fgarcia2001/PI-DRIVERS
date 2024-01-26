import React from "react";
import style from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const DriverCreado = ({ name }) => {
  const navigate = useNavigate();
  const close = () => {
    navigate(`/home?from=driverCreado`, { state: { name } });
  };
  return (
    <div className={style.driverCreado}>
      <div className={style.cartel}>
        <h2 className={style.h2driver}>DRIVER CREATED!</h2>
        <button onClick={close}>
          <FontAwesomeIcon icon={faXmark} className={style.botonClose} />
        </button>
      </div>
    </div>
  );
};

export default DriverCreado;
