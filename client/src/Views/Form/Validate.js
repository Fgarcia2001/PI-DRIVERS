const validate = (state) => {
  const errors = {};
  if (state.description.length > 50) {
    errors.description = "*Debe contener menos de 50 caracteres";
  }
  if (
    !/^[A-Za-z]+$/.test(state.name) ||
    state.name.length < 2 ||
    state.name.length > 15
  ) {
    errors.name = "*Debe contener entre 2-15 letras";
  }
  if (
    !/^[A-Za-z]+$/.test(state.surname) ||
    state.surname.length < 2 ||
    state.surname.length > 15
  ) {
    errors.surname = "*Debe contener entre 2-15 letras";
  }
  if (state.nationality.length === 0) {
    errors.nationality = "*Obligatory*";
  }
  if (state.teams.length === 0) {
    errors.teams = "Falta seleccionar team";
  }
  return errors;
};

export default validate;
