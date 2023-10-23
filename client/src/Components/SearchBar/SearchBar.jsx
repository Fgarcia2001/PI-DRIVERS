import React from "react";
import { useState } from "react";
import { getDriverName } from "../../redux/actions";
import { useDispatch } from "react-redux";
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
    <div>
      <form onSubmit={handleSubmit}>
        <input id="search" onChange={handleChange} type="text" />
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default SearchBar;
