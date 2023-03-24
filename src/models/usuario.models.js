import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Rol } from "../models/rol.models.js";

export const usuarioM = sequelize.define(
  "usuario",
  {
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
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
    },
    contrasenia: {
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
// para resubir

usuarioM.belongsTo(Rol, {
  foreignKey: "rolID",
  soucreKey: "id",
});
Rol.hasMany(usuarioM, {
  foreingKey: "rolID",
  sourceKey: "id",
});
var data = [
  {
    nombre: "root",
    usuario: "root",
    correo: "root@root",
    contrasenia: "root",
    rolID: "1",
    rol: "administrador",
  },
];

await usuarioM.bulkCreate(data, { ignoreDuplicates: true });
