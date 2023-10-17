const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const { DEFAULT_IMAGE } = process.env;
const axios = require("axios");
const URL = "http://localhost:5000/drivers";

const cleanApi = (
  apiDrivers // limpia la api con las propiedades que quiero
) =>
  apiDrivers.map((drive) => {
    return {
      name: drive.name.forename,
      image: drive.image.url ? drive.image.url : DEFAULT_IMAGE,
      teams: drive.teams,
    };
  });

const getAllDrivers = async () => {
  const dataBase = await Driver.findAll({ attributes: ["name", "image"] });
  const response = await axios(URL);
  let allDrivers = cleanApi(response.data);
  allDrivers = [...allDrivers, ...dataBase];
  return allDrivers;
};

const getSomeDrivers = async (name) => {
  //Extraigo algunos drivers de la api
  const response = await axios(URL);
  let driversApi = cleanApi(response.data);
  driversApi = driversApi.filter((driver) => {
    const nameMay = driver.name.toUpperCase();
    return nameMay.startsWith(name);
  });
  //Extraigo algunos drivers de la bd
  const driverBd = await Driver.findAll({
    attributes: ["name", "image"],
    where: {
      name: {
        [Op.like]: `${name}%`,
      },
    },
  });
  const result = [...driversApi, ...driverBd];
  return result;
};

const getDriverId = async (id, source) => {
  if (source === "api") {
    const driver = await axios(`${URL}/${id}`);
    return {
      id: driver.data.id,
      name: driver.data.name.forename,
      surname: driver.data.name.surname,
      image: driver.data.image.url,
      nationality: driver.data.nationality,
      birthdate: driver.data.dob,
      description: driver.data.description,
      teams: driver.data.teams,
    };
  }
  const driver = await Driver.findByPk(id);
  return driver;
};

const postDriver = async ({
  name,
  surname,
  description,
  image,
  nationality,
  birthdate,
  teams,
}) => {
  if (!image) {
    image = DEFAULT_IMAGE;
  }
  const newDriver = await Driver.create({
    name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
    surname: surname[0].toUpperCase() + surname.slice(1).toLowerCase(),
    description,
    image,
    nationality:
      nationality[0].toUpperCase() + nationality.slice(1).toLowerCase(),
    birthdate,
  });

  const teamsBd = await Team.findAll({
    where: {
      name: { [Op.or]: teams },
    },
  });

  //Hacemos la relacion entre el drive creado y los teams que fueron seleccionados
  teamsBd.forEach((element) => {
    newDriver.addTeam(element);
  });
  return newDriver;
};

module.exports = { getAllDrivers, getSomeDrivers, getDriverId, postDriver };
