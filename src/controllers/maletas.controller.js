import { maleta } from "../models/maletas.models.js";
import { Boleto } from "../models/boletos.models.js";

export const verMaletas = async (req, res) => {
  try {
    const maletas = await maleta.findAll();
    return res.json(maletas);
  } catch (error) {
    console.log("ERROR EN MALETA WEON ", error);
    return res.status(500).json({ message: error.message });
  }
}; // para resubir

export const crearMaletas = async (req, res) => {
  try {
    const { peso, precio, folio } = req.body;
    const boletos = await boleto.findOne({
      where: {
        folio,
      },
      attributes: ["id"],
    });
    if (boletos == null) {
      return res.status(500).json({ message: "FOLIO NO ENCONTRADO" });
    } else {
      const boletoId = boletos.id;
      const maletas = await maleta.create({
        peso,
        precio,
        boletoId,
      });
      return res.json(maletas);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const eliminarMaleta = async (req, res) => {
  const { folio } = req.params;
  try {
    const maletas = await maleta.destroy({
      where: { folio },
    });
  } catch (error) {}
};
export const actualizarMaleta = async (req, res) => {
  const { folio } = params.folio;
  try {
    const boletos = await boleto.findOne({
      where: {
        folio,
      },
      attributes: ["id"],
    });
    if (boletos == null) {
      return res.status(500).json({ message: "FOLIO NO ENCONTRADO" });
    } else {
      const boletoId = boletos.id;
      const maletas = maleta.findOne({
        where: { boletoId },
      });
      maletas.set(req.body);
      await maletas.save();
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
