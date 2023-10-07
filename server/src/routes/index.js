const { Router } = require("express");
const driveRouter = require("./driverRouter");
const router = Router();

router.use("/drivers", driveRouter);

module.exports = router;
