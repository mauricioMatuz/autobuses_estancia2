import Sequelize from "sequelize";

export const sequelize = new Sequelize("centro_autobuses", "mau", "123", {
  host: "54.160.108.127",
  dialect: "mysql",
});
