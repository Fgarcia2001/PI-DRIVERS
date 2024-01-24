import React from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";
const Nav = () => {
  return (
    <div className={style.containerNav}>
      <Link to="/about" className={style.botones}>
        ABOUT
      </Link>
      <Link to="/home" className={style.botones}>
        HOME
        <FontAwesomeIcon icon={faHouse} />
      </Link>

      <Link to="/create" className={style.botones}>
        CREATE
        <FontAwesomeIcon icon={faUsers} />
      </Link>
      <SearchBar />
      <Link to="/" className={style.exit}>
        EXIT
        <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
      </Link>
    </div>
  );
};

export default Nav;
