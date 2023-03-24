import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
// import { usuarioM } from "./usuario.models.js";

export const Rol = sequelize.define(
  "rol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);

var data = [
  {
    rol: "Administrador",
  },
];
await Rol.bulkCreate(data);
