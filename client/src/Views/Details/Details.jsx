import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { clearDetail, getDriverId } from "../../redux/actions";
import style from "./Detail.module.css";
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
    <div className={style.detailContainer}>
      <Link to="/home" className={style.buton}>
        BACK
      </Link>

      <div className={style.acomodo}>
        <img src={driver.image} className={style.image} />
        <div>
          <h2 className={style.todos}>Id | {driver.id}</h2>
          <h2 className={style.todos}>Name | {driver.name} </h2>
          <h2 className={style.todos}>Lastname | {driver.surname}</h2>
          <h2 className={style.todos}>Nationality | {driver.nationality}</h2>
          <h2>
            {driver.description ? (
              <p className={style.todos}>Description: {driver.description}</p>
            ) : (
              <p className={style.todos}>Description | Not description</p>
            )}
          </h2>
          <h2 className={style.todos}>Birthdate | {driver.birthdate}</h2>
          {driver.teams ? (
            <h2 className={style.todos}>Teams | {driver.teams}</h2>
          ) : (
            <h2 className={style.todos}>Teams: Not have teams</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
