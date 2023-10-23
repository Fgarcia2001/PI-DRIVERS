import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { clearDetail, getDriverId } from "../../redux/actions";
const Details = () => {
  const { id } = useParams();
  const driver = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriverId(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>BACK</button>
      </Link>
      <img src={driver.image} />
      <h2>Id: {driver.id}</h2>
      <h2>Nombre: {driver.name} </h2>
      <h2>Apellido: {driver.surname}</h2>
      <h2>Nacionalidad: {driver.nationality}</h2>
      <h2>Descripcion:{driver.description}</h2>
      <h2>Fecha de nacimiento: {driver.birthdate}</h2>
      <h2>Teams: {driver.teams}</h2>
    </div>
  );
};

export default Details;
