require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/db.js");
const { DB_PORT } = process.env();
conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${DB_PORT}`);
    });
  })
  .catch((error) => console.error(error));
