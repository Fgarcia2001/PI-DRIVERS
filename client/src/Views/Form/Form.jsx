import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTeams, postDriver } from "../../redux/actions";
import validate from "./Validate";
const Form = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);

  const [state, setState] = useState({
    name: "",
    surname: "",
    image: "",
    description: "",
    birthdate: "",
    teams: [],
  });

  const [errors, setErrors] = useState({});

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = (event) => {
    if (event.target.name === "teams") {
      if (!state.teams.includes(event.target.value)) {
        setState({
          ...state,
          teams: [...state.teams, event.target.value],
        });
        setErrors(
          validate({
            ...state,
            teams: [...state.teams, event.target.value],
          })
        );
      } else {
        alert(`El team ${event.target.value} ya fue agregado`);
      }
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
      setErrors(
        validate({
          ...state,
          [event.target.name]: event.target.value,
        })
      );
    }
  };

  const removeTeam = (teamToRemove) => {
    const updatedTeams = state.teams.filter((team) => team !== teamToRemove);
    setState({
      ...state,
      teams: updatedTeams,
    });
    setErrors(
      validate({
        ...state,
        teams: updatedTeams,
      })
    );
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);
  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error.length > 0);
    setIsSubmitDisabled(hasErrors);
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDriver(state));
  };

  return (
    <div className={style.container}>
      <Link to="/home" className={style.link}>
        BACK
      </Link>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>NAME</label>
        <input
          className={style.input}
          name="name"
          value={state.name}
          onChange={handleChange}
          type="text"
        />
        {errors.name ? <p className={style.error}>{errors.name}</p> : <p> </p>}
        <label className={style.label}>LASTNAME</label>
        <input
          className={style.input}
          value={state.surname}
          name="surname"
          onChange={handleChange}
          type="text"
        />
        {errors.surname ? (
          <p className={style.error}>{errors.surname}</p>
        ) : (
          <p> </p>
        )}
        <label className={style.label}>NATIONALITY</label>
        <input
          className={style.input}
          name="nationality"
          value={state.nationality}
          onChange={handleChange}
          type="text"
        />
        {errors.nationality ? (
          <p className={style.error}>{errors.nationality}</p>
        ) : (
          <p className={style.espacio}> </p>
        )}
        <label className={style.label}>IMAGE</label>
        <input
          value={state.image}
          className={style.input}
          name="image"
          onChange={handleChange}
          type="text"
        />

        <label className={style.label}>DESCRIPTION</label>
        <input
          value={state.description}
          className={style.input}
          name="description"
          onChange={handleChange}
          type="text"
        />
        {errors.description ? (
          <p className={style.error}>{errors.description}</p>
        ) : (
          <p className={style.espacio}> </p>
        )}
        <label className={style.label}>BIRTHDATE</label>
        <input
          className={style.input}
          name="birthdate"
          onChange={handleChange}
          type="date"
        />
        <label className={style.label}>TEAMS</label>
        <select
          onChange={handleChange}
          name="teams"
          value={state.teams}
          className={style.teamSelection}
        >
          {teams.map((team) => {
            return (
              <option value={team} key={team}>
                {team}
              </option>
            );
          })}
        </select>
        {errors.teams && <p className={style.error}>{errors.teams}</p>}
        <div className={style.teams}>
          {state.teams.map((selectedTeam) => (
            <div key={selectedTeam} className={style.team}>
              {selectedTeam}
              <button
                className={style.button}
                onClick={() => removeTeam(selectedTeam)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <input
          className={style.submit}
          value="Submit"
          type="submit"
          disabled={isSubmitDisabled}
        />
      </form>
    </div>
  );
};

export default Form;
