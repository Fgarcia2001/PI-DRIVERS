const axios = require("axios");
const URL = "http://localhost:5000/drivers";

const cleanApi = (
  apiDrivers // limpia la api con las propiedades que quiero
) =>
  apiDrivers.map((drive) => {
    return {
      id: drive.id,
      name: drive.name.forename,
      image: drive.image.url,
      teams: drive.teams,
    };
  });

const getAllDrivers = async (req, res) => {
  // Obtiene todos los drivers de la API
  try {
    const response = await axios.get(URL);
    const apiDrivers = response.data;
    const drivers = cleanApi(apiDrivers);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//module.exports = { getAllDrivers };
