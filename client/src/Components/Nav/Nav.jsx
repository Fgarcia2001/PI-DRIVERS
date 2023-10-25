import React from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
const Nav = () => {
  return (
    <div className={style.containerNav}>
      <Link to="/home" className={style.botones}>
        HOME
      </Link>
      <Link to="/create" className={style.botones}>
        CREATE
      </Link>
      <Link to="/about" className={style.botones}>
        ABOUT
      </Link>
      <SearchBar />
      <Link to="/" className={style.exit}>
        EXIT
      </Link>
    </div>
  );
};

export default Nav;
