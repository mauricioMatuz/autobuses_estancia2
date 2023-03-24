import { Rol } from "../models/rol.models.js";
import jwt from "jsonwebtoken";

export const registrarRol = async (req, res) => {
  try {
    const { rol } = req.body;
    const rolcito = await Rol.create({
      rol,
    });
    return res.status(403).json({ message: "rol registrado" });
  } catch (error) {
    return res.status(403).json({ message: error });
  }
};

export const getRol = async (req,res)=>{
    try {
        const rolcito = await Rol.findAll()
        return res.status(200).json({message: rolcito})
    } catch (error) {
        
    }
}

export const eliminarRol = async (req, res) => {
  try {
    const { id } = req.body;
    const rolcito = await Rol.destroy({
      where: { id },
    });
  } catch (error) {}
};
