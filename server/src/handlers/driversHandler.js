const {
  getAllDrivers,
  getSomeDrivers,
  getDriverId,
  postDriver,
} = require("../controllers/driversController");

const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const drivers = await getAllDrivers();
      res.status(200).json(drivers);
    } else {
      const Name = name.toUpperCase();
      const someDrivers = await getSomeDrivers(Name);
      res.status(200).json(someDrivers.slice(0, 15));
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getDriverIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const driverDetail = await getDriverId(id, source);
    res.status(200).json(driverDetail);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postCreateHandler = async (req, res) => {
  try {
    const { name, surname, description, image, nationality, birthdate, teams } =
      req.body;
    const post = await postDriver({
      name,
      surname,
      description,
      image,
      nationality,
      birthdate,
      teams,
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDriversHandler, getDriverIdHandler, postCreateHandler };
