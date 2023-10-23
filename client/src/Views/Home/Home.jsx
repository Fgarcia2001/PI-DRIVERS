import React from "react";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams, page } from "../../redux/actions";
const Home = () => {
  const dispatch = useDispatch();

  const allTeams = useSelector((state) => state.teams);
  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  useEffect(() => {}, [allTeams]);

  const pagination = (event) => {
    dispatch(page(event.target.name));
  };

  return (
    <div>
      <div>
        <label>Paginado</label>
        <button name="prev" onClick={pagination}>
          Prev
        </button>
        <button name="next" onClick={pagination}>
          Next
        </button>
      </div>
      <Cards />
    </div>
  );
};

export default Home;
