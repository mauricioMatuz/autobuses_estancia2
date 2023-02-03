import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const usuarioM = sequelize.define("usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  usuario: {
    type: DataTypes.STRING,
    unique: true
  },
  correo: {
    type: DataTypes.STRING,
  },
  contrasenia: {
    type: DataTypes.STRING,
    unique: true
  },
});
// para resubir