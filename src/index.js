import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    app.listen(8080);
    console.log("TODO OK EN EL SERVIOR " + 8080);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
