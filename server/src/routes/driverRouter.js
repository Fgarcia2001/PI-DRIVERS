const { Router } = require("express");

const {
  getDriversHandler,
  getDriverIdHandler,
  createDriver,
} = require("../handlers/driversHandler");
const driverRouter = Router();

driverRouter.get("/", getDriversHandler);
driverRouter.get("/:id", getDriverIdHandler);
driverRouter.post("/", createDriver);
module.exports = driverRouter;
