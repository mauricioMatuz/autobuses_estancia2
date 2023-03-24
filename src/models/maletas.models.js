import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const maleta = sequelize.define(
  "maletas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    peso: {
      type: DataTypes.STRING,
    },
    precio: {
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
