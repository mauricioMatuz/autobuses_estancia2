import Sequelize from "sequelize";

export const sequelize = new Sequelize("centro_autobuses", "postgres", "1234", {
  host: '127.0.0.1',
  dialect: "postgres",
});
