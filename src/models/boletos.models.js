import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { usuarioM } from "./usuario.models.js";
import { Autobus } from "./autobus.models.js";

export const Boleto = sequelize.define(
  "boletos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantAsientos: {
      type: DataTypes.INTEGER,
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



Boleto.hasMany(usuarioM, {
  foreingKey: "usuario_id",
  sourceKey: "id",
});

usuarioM.hasMany(Boleto, {
  foreingKey: "boleto_id",
  targetId: "id",
});

Boleto.belongsTo(Autobus,{
  foreingKey:"autobus_id",
  targetId: "id"
})
// para resubir
