import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Form.module.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ImageHandler from "./ImageUploader/ImageUploader";
import DriverCreado from "./DriverCreado";
import { getNationalities, getTeams, postDriver } from "../../redux/actions";
import validate from "./Validate";
const Form = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const nacionalidades = useSelector((state) => state.nationalities);

  const [state, setState] = useState({
    name: "",
    surname: "",
    image: "",
    nationality: "",
    description: "",
    birthdate: "",
    teams: [],
  });

  const [errors, setErrors] = useState({});
  const [post, setPost] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const chageUploadImage = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_react");

    const response = await axios.post(
      `https://api.clodinary.com/v1_1/dcqtgje4b/image/upload`,
      data
    );
    setState({
      ...state,
      image: response.data.secure_url,
    });
  };
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

  useEffect(
    () => {
      dispatch(getTeams());

      if (nacionalidades.length === 0) {
        dispatch(getNationalities());
      }
      const hasErrors = Object.values(errors).some((error) => error.length > 0);
      setIsSubmitDisabled(hasErrors);
      return () => {
        setPost(false);
      };
    },
    [dispatch],
    [errors]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(postDriver(state));
    if (response === true) {
      setPost(true);
    }
  };

  return (
    <div className={style.create}>
      {post && <DriverCreado name={state.name} />}
      <p className={style.title}>Create your driver</p>
      <div className={style.container}>
        <Link to="/home" className={style.link}>
          BACK
        </Link>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.namesurname}>
            <div className={style.divName}>
              <label className={style.label}>Name</label>
              <input
                className={style.input}
                name="name"
                value={state.name}
                onChange={handleChange}
                type="text"
              />
              {errors.name ? (
                <p className={style.error}>{errors.name}</p>
              ) : (
                <p> </p>
              )}
            </div>
            <div className={style.divName}>
              <label className={style.label}>Lastname</label>
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
            </div>
          </div>
          <div className={style.natAndBirth}>
            <div className={style.divName}>
              <label className={style.label}>Nationality</label>
              <select
                name="nationality"
                onChange={handleChange}
                value={state.nationality}
                className={style.selectNat}
              >
                {nacionalidades.map((nac) => (
                  <option value={nac}>{nac}</option>
                ))}
              </select>

              {errors.nationality ? (
                <p className={style.error}>{errors.nationality}</p>
              ) : (
                <p> </p>
              )}
            </div>
            <div className={style.divName}>
              <label className={style.label}>Birthdate</label>
              <input
                className={style.input}
                name="birthdate"
                onChange={handleChange}
                type="date"
              />
            </div>
          </div>
          <div className={style.divDescription}>
            <div className={style.description}>
              <label className={style.labelDescription}>Description </label>
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
                <p></p>
              )}
            </div>
          </div>
          <div className={style.divImageTeams}>
            <div className={style.divImagen}>
              <ImageHandler
                onImageChange={(imageUrl) =>
                  setState({ ...state, image: imageUrl })
                }
              />
            </div>
            <div className={style.divTeams}>
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
            </div>
          </div>
          <div className={style.divBoton}>
            <input
              className={style.submit}
              value="Submit"
              type="submit"
              disabled={isSubmitDisabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
