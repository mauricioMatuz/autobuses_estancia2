import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { maleta } from "./maletas.models.js";

export const boleto = sequelize.define("boletos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  marca: {
    type: DataTypes.STRING,
  },
  servicio: {
    type: DataTypes.STRING,
  },
  origen: {
    type: DataTypes.STRING,
  },
  terminal_salida: {
    type: DataTypes.STRING,
  },
  destino: {
    type: DataTypes.STRING,
  },
  terminal_llegada: {
    type: DataTypes.STRING,
  },
  fecha_salida: {
    type: DataTypes.STRING,
  },
  corrida: {
    type: DataTypes.STRING,
  },
  asiento: {
    type: DataTypes.STRING,
  },
  hora_salida: {
    type: DataTypes.STRING,
  },
  folio: {
    type: DataTypes.STRING,
  },
  precio: {
    type: DataTypes.STRING,
  },
});

boleto.hasMany(maleta, {
  foreingKey: "boleto_id",
  sourceKey: "id",
});

maleta.belongsTo(boleto, {
  foreingKey: "boleto_id",
  targetId: "id",
});
// para resubir