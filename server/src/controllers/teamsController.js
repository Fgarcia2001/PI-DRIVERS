const { Team } = require("../db");
const axios = require("axios");
const URL = "http://localhost:5000/drivers";
const cleanTeams = (drivers) => {
  const teams = [];
  drivers.forEach((driver) => {
    if (driver.teams) {
      const teamsArray = driver.teams.split(",").map((team) => team.trim());
      teamsArray.forEach((team) => {
        if (team.length > 0 && !teams.includes(team)) {
          teams.push(team);
        }
      });
    }
  });
  return teams;
};

const getTeams = async () => {
  const response = await axios(URL);
  const teams = cleanTeams(response.data);
  teams.map(
    async (team) =>
      await Team.findOrCreate({
        where: { name: team },
        defaults: { name: team },
      })
  );
  return teams;
};

module.exports = { getTeams };
