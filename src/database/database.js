import Sequelize from "sequelize";

// export const sequelize = new Sequelize("centro_autobuses", "mau", "123", {
//   host: "52.73.146.94",
//   dialect: "mysql",
// });
export const sequelize = new Sequelize("centro_autobuses", "postgres", "1234", {
  host: "127.0.0.1",
  dialect: "postgres",
});

// para resubir
