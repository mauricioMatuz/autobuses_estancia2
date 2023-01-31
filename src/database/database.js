import Sequelize from "sequelize";

export const sequelize = new Sequelize("centro_autobuses", "mau", "123", {
  host: "52.73.146.94",
  dialect: "mysql",
});
