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
      id: drive.id,
      name: drive.name.forename,
      image: drive.image.url ? drive.image.url : DEFAULT_IMAGE,
      teams: drive.teams,
      birthdate: drive.dob,
      created: false,
    };
  });

const getAllDrivers = async () => {
  let dataBase = await Driver.findAll({
    attributes: ["id", "name", "image", "created", "birthdate"],
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  dataBase = dataBase.map((driver) => {
    const teamNames = driver.Teams.map((team) => team.name).join(", ");
    driver.teams = teamNames;
    delete driver.Teams;
    return {
      id: driver.id,
      name: driver.name,
      image: driver.image,
      birthdate: driver.birthdate,
      teams: driver.teams,
      created: driver.created,
    };
  });

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
  let driverBd = await Driver.findAll({
    attributes: ["id", "name", "image", "created", "birthdate"],
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  driverBd = driverBd.filter((driver) => {
    const nameMay = driver.name.toUpperCase();
    return nameMay.startsWith(name);
  });

  driverBd = driverBd.map((driver) => {
    const teamNames = driver.Teams.map((team) => team.name).join(", ");
    driver.teams = teamNames;
    delete driver.Teams;
    return {
      id: driver.id,
      name: driver.name,
      image: driver.image,
      birthdate: driver.birthdate,
      teams: driver.teams,
      created: driver.created,
    };
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
      image: driver.data.image.url ? driver.data.image.url : DEFAULT_IMAGE,
      nationality: driver.data.nationality,
      birthdate: driver.data.dob,
      description: driver.data.description,
      teams: driver.data.teams,
      created: false,
    };
  } else {
    const driver = await Driver.findByPk(id, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const teamNames = driver.Teams.map((team) => team.name).join(",");
    driver.teams = teamNames;
    return {
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      image: driver.image,
      nationality: driver.nationality,
      birthdate: driver.birthdate,
      description: driver.description,
      teams: driver.teams,
      created: driver.created,
    };
  }
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
  const existingDriver = await Driver.findOne({
    where: {
      name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
      surname: surname[0].toUpperCase() + surname.slice(1).toLowerCase(),
      description,
      image,
      nationality:
        nationality[0].toUpperCase() + nationality.slice(1).toLowerCase(),
      birthdate,
    },
  });

  if (existingDriver) {
    return "Ya existe";
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
  return "Driver creado con exito!";
};

module.exports = { getAllDrivers, getSomeDrivers, getDriverId, postDriver };
