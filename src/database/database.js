import Sequelize from "sequelize";

export const sequelize = new Sequelize("centro_autobuses", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});
