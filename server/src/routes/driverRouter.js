const { Router } = require("express");

const {
  getDriversHandler,
  getDriverIdHandler,
  postCreateHandler,
} = require("../handlers/driversHandler");
const driverRouter = Router();

driverRouter.get("/", getDriversHandler);
driverRouter.get("/:id", getDriverIdHandler);
driverRouter.post("/", postCreateHandler);
module.exports = driverRouter;
