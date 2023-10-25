import React from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
const Nav = () => {
  return (
    <div className={style.containerNav}>
      <Link to="/home">HOME</Link>
      <Link to="/create">CREATE DRIVER</Link>
      <Link to="/delete">DELETE DRIVER</Link>
      <SearchBar />
      <Link to="/">EXIT</Link>
    </div>
  );
};

export default Nav;
