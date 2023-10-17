const { getTeams } = require("../controllers/teamsController");
const getTeamsHandler = async (req, res) => {
  try {
    const allTeams = await getTeams();
    if (allTeams.length > 0) {
      res.status(200).send(allTeams);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getTeamsHandler };
