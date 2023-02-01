import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js";

export const autobus = sequelize.define("autobus",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clave:{
        type: DataTypes.STRING
    },
    placa:{
        type: DataTypes.STRING
    },
    numasiento:{
        type: DataTypes.STRING
    },
    fecha:{
        type: DataTypes.STRING
    },
    tipo:{
        type: DataTypes.STRING
    },
    nombre:{
        type: DataTypes.STRING
    },
    licencia:{
        type: DataTypes.STRING
    }
    
})