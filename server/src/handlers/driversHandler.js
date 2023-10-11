const {
  getAllDrivers,
  getSomeDrivers,
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
      res.status(200).json(someDrivers);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getDriverIdHandler = (req, res) => {
  const { id } = req.params;
  res.send(`Detalle del driver numero ${id}`);
};

const createDriver = (req, res) => {
  const { name, teams } = req.body;
  res.send(
    `Creaste un driver con el nombre ${name} y estuvo en los teams: ${teams}`
  );
};

module.exports = { getDriversHandler, getDriverIdHandler, createDriver };
