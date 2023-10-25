import React from "react";
import { useState } from "react";
import { getDriverName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [driver, setDriver] = useState("");

  const handleChange = (event) => {
    if (event.target.value != "") {
      setDriver(event.target.value.trim());
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDriverName(driver));
    document.getElementById("search").value = "";
  };
  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          id="search"
          onChange={handleChange}
          type="text"
          className={style.search}
          placeholder="Name"
        />
        <input type="submit" className={style.enviar} value="Search"></input>
      </form>
    </div>
  );
};

export default SearchBar;
