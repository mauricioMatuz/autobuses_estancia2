import { Autobus } from "../models/autobus.models.js";

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
      ],
    }); // para resubir
    return res.status(200).json({ message: autobus });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
};

export const registrarAutobus = async (req, res) => {
  try {
    const { clave, placa, numasientos, fecha, tipo, nombre, licencia } =
      req.body;
    const autobus = await Autobus.create({
      clave,
      placa,
      numasientos,
      fecha,
      tipo,
      nombre,
      licencia,
    });
    return res
      .status(200)
      .json({ status: true, message: "El registro se almacenó correctamente" });
  } catch (error) {
    return res
      .status(200)
      .json({ status: false, message: "Error en el proceso de registro" });
  }
};

export const borrarAutobus = async (req, res) => {
  try {
    const { id } = req.body;
    const autobus = await Autobus.findOne({
      where: { id },
    });
    if (autobus == null) {
      return res
        .status(200)
        .json({ status: false, message: "ID no encontrado" });
    } else {
      return res.status(200).json({ status: true, message: "Autobus borrado" });
    }
  } catch (error) {
    return res.status(200).json({ message: "ERROR SERVIDOR" });
  }
};

export const actualizarAutobus = async (req, res) => {
  try {
    const { id } = req.body;
    const autobus = await Autobus.findOne({
      where: { id },
    });
    if (autobus == null) {
      return res
        .status(200)
        .json({ status: false, message: "Autobus no encontrado" });
    } else {
      console.log("NO NULL", req.body);
      await autobus.save();
      return res
        .status(200)
        .json({ status: true, message: "Autobus actualizado" });
    }
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
      ],
    });
    if (autobus == null) {
      return res
        .status(200)
        .json({ status: false, message: "Autobus no encontrado" });
    } else {
      return res.status(200).json({ status: true, message: autobus });
    }
  } catch (error) {}
};
