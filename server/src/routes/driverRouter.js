const { Router } = require("express");
const { getDrivers } = require("../controllers/getDrivers");
const { getDriverId } = require("../controllers/getDriverId");
const driverRouter = Router();

driverRouter.get("/", getDrivers);
driverRouter.get("/:id", getDriverId);
module.exports = driverRouter;
