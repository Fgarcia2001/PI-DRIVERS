import React from "react";
import { useState } from "react";
import { getDriverName } from "../../redux/actions";
import { useDispatch } from "react-redux";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [driver, setDriver] = useState("");

  const handleChange = (event) => {
    setDriver(event.target.value.trim());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDriverName(driver));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />{" "}
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default SearchBar;
