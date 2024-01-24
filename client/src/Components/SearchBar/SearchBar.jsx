import React from "react";
import { useState } from "react";
import { getDriverName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
        <button type="submit" className={style.enviar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
