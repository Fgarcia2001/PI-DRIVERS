const { Router } = require("express");
const { getTeams } = require("../handlers/teamsHandler");

const teamsRouter = Router();

teamsRouter.get("/", getTeams);

module.exports = teamsRouter;
