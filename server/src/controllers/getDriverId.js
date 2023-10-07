const axios = require("axios");
const { response } = require("express");
const URL = "http://localhost:5000/drivers";

const cleanApi = (drive) => {
  return {
    id: drive.id,
    name: drive.name.forename,
    surname: drive.name.surname,
    image: drive.image.url,
    nationality: drive.nationality,
    birthdate: drive.dob,
    teams: drive.teams,
    description: drive.description,
  };
};

const getDriverId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${URL}/${id}`);
    const driverDetail = cleanApi(response.data);

    res.status(200).json(driverDetail);
  } catch (error) {
    res.status(404).send({
      error: "error al traer el detalle, puede que no exista el id",
    });
  }
};

module.exports = { getDriverId };
