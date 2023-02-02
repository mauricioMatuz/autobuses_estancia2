import { usuarioM } from "../models/usuario.models.js";

export const verUsuarios = async (req, res) => {
  try {
    const usuario = await usuarioM.findAll({
      attributes: ["nombre", "usuario", "correo", "contrasenia"],
    });
    return res.status(200).json({ usuario });
  } catch (error) {
    return res.status(500).json({ message: "Error servidor" });
  }
};
// para resubir
export const registrar = async (req, res) => {
  try {
    const { nombre, usuario, correo, contrasenia } = req.body;

    const usuarios = await usuarioM.create({
      nombre,
      usuario,
      correo,
      contrasenia,
      attributes: ["nombre", "usuario", "correo", "contrasenia"],
    });
    return res
      .status(200)
      .json({ status: true, message: "El registro se almaceno correctamente" });
  } catch (error) {
    return res
      .status(200)
      .json({ status: false, message: "Error en el proceso de registro" });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("ESTO ES ID DELETE ", id);
    const usuarios = await usuarioM.destroy({
      where: { id },
    });
    return res.status(200).json({ message: "Eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR SERVIDOR" });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const usuarios = await usuarioM.findOne({
      where: { id },
      attributes: ["nombre", "usuario", "correo", "contrasenia"],
    });
    if (usuarios == null) {
      return res.json({ message: "USUARIO NO ENCONTRADO" });
    } else {
      return res.status(200).json({ usuarios });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("ID", id);
    const usuarios = await usuarioM.findOne({
      where: { id },
      attributes: ["nombre", "usuario", "correo", "contrasenia"],
    });
    if (usuarios == null) {
      return res.json({ message: "usuario NO ENCONTRADO" });
    } else {
      console.log("NO NULL");
      usuarios.set(req.body);
      await usuarios.save();
      return res.json({ usuarios });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    console.log(req.boy);
    const { usuario, contrasenia } = req.body;
    console.log("ENTRO A INICIAR SEION ", usuario, "\t", contrasenia);
    const usuarios = await usuarioM.findOne({
      where: {
        usuario,
      },
      attributes: ["nombre", "usuario", "correo", "contrasenia"],
    });
    if (usuarios == null) {
      return res
        .status(200)
        .json({ status: false, message: "Usuario no encontrado" });
    } else {
      const usuariosC = await usuarioM.findOne({
        where: {
          contrasenia,
        },
        attributes: ["nombre", "usuario", "correo", "contrasenia"],
      });
      if (usuariosC == null) {
        return res
          .status(200)
          .json({ status: false, message: "La contraseña es incorrecta" });
      } else {
        return res.status(200).json({
          status: true,
          message: "Sesión iniciada correctamente",
          usuariosC,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
