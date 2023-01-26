import { boleto } from "../models/boletos.models.js";
import { maleta } from "../models/maletas.models.js";

export const getBoletos = async (req, res) => {
  try {
    const boletos = await boleto.findAll();
    return res.json(boletos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBoletos = async (req, res) => {
  try {
    const {
      nombre,
      marca,
      servicio,
      origen,
      terminal_salida,
      destino,
      terminal_llegada,
      fecha_salida,
      corrida,
      asiento,
      hora_salida,
      folio,
      precio,
    } = req.body;
    const nuevoBoleto = await boleto.create({
      nombre,
      marca,
      servicio,
      origen,
      terminal_salida,
      destino,
      terminal_llegada,
      fecha_salida,
      corrida,
      asiento,
      hora_salida,
      folio,
      precio,
    });

    return res.json(nuevoBoleto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBoleto = async (req, res) => {
  try {
    const { folioB } = req.body;
    console.log(folioB);
    const boletos = await boleto.findOne({
      where: {
        folioB,
      },
    });
    if (boletos == null) {
      return res.status(500).json({ message: "ID NO ENCONTRADO" });
    } else {
      boletos.set(req.body);
      await boletos.save();
      return res.json(boletos);
    }
  } catch (error) {
    console.log("ERROR EN PUT ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBoleto = async (req, res) => {
  try {
    console.log("SI");
    const { id } = req.body;
    const boletos = await boleto.destroy({
      where: {
        id,
      },
    });
    return res.send("ELIMINADO");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneBoleto = async (req, res) => {
  try {
    const { folio } = req.params;
    const boletos = await boleto.findOne({
      where: {
        folio,
      },
    });
    if (boletos == null) {
      return res.status(500).json({ message: "ID NO ENCONTRADO" });
    } else {
      return res.json(boletos);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const buscarMaleta = async (req, res) => {
  try {
    const { folio } = req.params;
    const boletos = await boleto.findOne({
      where: { folio },
      attributes: ["id"],
    });

    if (boletos == null) {
      return res.json({ message: "FOLIO NO ENCONTRADO" });
    } else {
      const boletoId = boletos.id;
      const maletas = await maleta.findOne({
        where: { boletoId },
        attributes: ["peso", "precio"],
      });
      return res.json(maletas);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
