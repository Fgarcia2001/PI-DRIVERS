const { Router } = require("express");
const driveRouter = require("./driverRouter");
const teamsRouter = require("./teamsRouter");
const router = Router();

router.use("/drivers", driveRouter);
router.use("/teams", teamsRouter);
module.exports = router;
