import { Autobus } from "../models/autobus.models.js";
import jwt from "jsonwebtoken";

export const getAutobus = async (req, res) => {
  try {
    const autobus = await Autobus.findAll({
      attributes: [
        "id",
        "clave",
        "placa",
        "numasientos",
        "fecha",
        "tipo",
        "nombre",
        "licencia",
        "destino",
      ],
    });
    const tokensito = verifyToken(req, res);
    jwt.verify(tokensito, "vendedor", (error) => {
      if (error) {
        console.log("entro a error ", error);
        return res.status(500).json({ message: "ERROR NO TOKEN" });
      } else {
        return res.status(200).json({ message: autobus });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
};

export const registrarAutobus = async (req, res) => {
  try {
    const {
      clave,
      placa,
      numasientos,
      fecha,
      tipo,
      nombre,
      licencia,
      destino,
    } = req.body;

    const tokensito = await verifyToken(req, res);
    await jwt.verify(tokensito, "vendedor", (error) => {
      if (error) {
        return res.status(401).json({ error: "Error en token" });
      } else {
        const autobus = Autobus.create({
          clave,
          placa,
          numasientos,
          fecha,
          tipo,
          nombre,
          licencia,
          destino,
        });
        return res.status(200).json({
          status: true,
          message: "El registro se almacenó correctamente",
        });
      }
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: false, message: "Error en el proceso de registro" });
  }
};

export const borrarAutobus = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const autobus = await Autobus.findOne({
      where: { id },
    });
    const tokensito = verifyToken(req, res);
    await jwt.verify(tokensito, "vendedor", (error) => {
      if (error) {
        return res.status(401).json({ error: "Error en token" });
      } else {
        if (autobus == null) {
          return res
            .status(200)
            .json({ status: false, message: "ID no encontrado" });
        } else {
          const autobus = Autobus.destroy({
            where: { id },
          });
          return res
            .status(200)
            .json({ status: true, message: "Autobus borrado" });
        }
      }
    });
  } catch (error) {
    console.log(error, " ERROR LA PTM XD");
    return res.status(200).json({ message: "ERROR SERVIDOR" });
  }
};

export const actualizarAutobus = async (req, res) => {
  try {
    const { id } = req.body;
    const autobus = await Autobus.findOne({
      where: { id },
    });
    const tokensito = verifyToken(req, res);
    await jwt.verify(tokensito, "vendedor", (error) => {
      if (error) {
        return res.status(401).json({ error: "Error en token" });
      } else {
        if (autobus == null) {
          return res
            .status(200)
            .json({ status: false, message: "Autobus no encontrado" });
        } else {
          console.log("NO NULL", req.body);
          autobus.set(req.body);
          autobus.save();
          return res
            .status(200)
            .json({ status: true, message: "Autobus actualizado" });
        }
      }
    });
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({ message: "ERROR SERVIDOR" });
  }
};

export const buscarAutobus = async (req, res) => {
  try {
    const { id } = req.body;
    const autobus = await Autobus.findOne({
      where: { id },
      attributes: [
        "id",
        "clave",
        "placa",
        "numasientos",
        "fecha",
        "tipo",
        "nombre",
        "licencia",
        "destino",
      ],
    });
    const tokensito = verifyToken(req, res);
    jwt.verify(tokensito, "secretkey", (error) => {
      if (error) {
        return res.status(401).json({ error: "Error en token" });
      } else {
        if (autobus == null) {
          return res
            .status(200)
            .json({ status: false, message: "Autobus no encontrado" });
        } else {
          return res.status(200).json({ status: true, message: autobus });
        }
      }
    });
  } catch (error) {}
};

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    return bearerToken;
  } else {
    return 0;
  }
}
