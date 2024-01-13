const validate = (state) => {
  const errors = {};
  if (state.description.length > 50) {
    errors.description = "Debe contener menos de 50 caracteres";
  }
  if (
    !/^[A-Za-z]+$/.test(state.name) ||
    state.name.length < 2 ||
    state.name.length > 15
  ) {
    errors.name = "Debe contener solo letras y 2-15 caracteres";
  }
  if (
    !/^[A-Za-z]+$/.test(state.surname) ||
    state.surname.length < 2 ||
    state.surname.length > 15
  ) {
    errors.surname = "Debe contener solo letras y 2-15 caracteres";
  }
  if (!/^[A-Za-z]+$/.test(state.nationality)) {
    errors.nationality = "Debe contener solo letras";
  }
  if (state.teams.length === 0) {
    errors.teams = "Falta seleccionar team";
  }
  return errors;
};

export default validate;
