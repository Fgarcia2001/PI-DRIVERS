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

const getAllDrivers = async () => {
  const response = await axios(URL);
  const allDrivers = cleanApi(response.data);
  return allDrivers;
};

const getSomeDrivers = async (name) => {
  const response = await axios(URL);
  const allDrivers = cleanApi(response.data);
  return allDrivers
    .filter((driver) => {
      const nameMay = driver.name.toUpperCase();
      return nameMay.startsWith(name);
    })
    .map((driver) => {
      return {
        image: driver.image,
        name: driver.name,
        teams: driver.teams,
      };
    });
};

module.exports = { getAllDrivers, getSomeDrivers };
