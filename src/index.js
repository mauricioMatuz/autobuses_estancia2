import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    app.listen(8080, () => {
      console.log("TODO OK EN EL SERVIOR " + 8080);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
// para resubir
/**
 * await db.platforms.bulkCreate([
        {name: "android", description: "Android", so: "android"},
        {name: "ios", description: "iOS", so: "ios"},
        {name: "windows", description: "Windows", so: "windows"},
        {name: "linux", description: "Linux", so: "linux"},
        {name: "mac", description: "Mac", so: "mac"}
    ]);
    console.log(`Server is listening on port ${port}`);
 * 
 */
