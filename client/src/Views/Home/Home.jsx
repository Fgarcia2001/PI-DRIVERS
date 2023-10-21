import React from "react";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div>
      <Cards />
    </div>
  );
};

export default Home;
