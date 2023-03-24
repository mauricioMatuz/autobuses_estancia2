import { Boleto } from "../models/boletos.models.js";
import { Autobus } from "../models/autobus.models.js";

export const getBoletos = async (req, res) => {
  try {
    const boleto = await Boleto.findAll({});
    return res.status(200).json({ message: boleto });
  } catch (error) {
    return res.status(403).json({ message: "error servidor" });
  }
};

export const registrarBoleto = async (req, res) => {
  try {
    const { cantAsientos, boleto_id, autobus_id } = req.body;
    const boleto = await Boleto.create({
      cantAsientos,
      boleto_id,
      autobus_id,
    });
    const autobus = await Autobus.findOne({
      where: { id: autobus_id },
      attributes: ["numasientos"],
    });
    console.log(autobus.numasientos, " autobus.numasientos------");
    let actuAsiento = autobus.numasientos - cantAsientos;
    console.log(actuAsiento, " esto es lo q falta");
    autobus.set({ id: autobus_id, numasientos: actuAsiento });
    await autobus.save();
    res.status(200).json({ message: "Boletos comprados :D" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error.message });
  }
};
