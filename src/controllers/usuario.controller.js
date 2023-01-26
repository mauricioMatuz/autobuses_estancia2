import { usuarioM } from "../models/usuario.models.js";

export const verUsuarios = async (req, res) => {
  try {
    const usuario = await usuarioM.findAll();
    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registrar = async (req, res) => {
  try {
    console.log("SI ENTRO A REGISTRAR PERO NO JALA EN EL FRONT");
    const { nombre, usuario, correo, contrasenia } = req.body;
    const usuarios = await usuarioM.create({
      nombre,
      usuario,
      correo,
      contrasenia,
    });
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ESTO ES ID DELETE ", id);
    const usuarios = await usuarioM.destroy({
      where: { id },
    });
    return res.send("ELIMINADO");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, " esto es id");
    const usuarios = await usuarioM.findOne({
      where: { id },
    });
    if (usuarios == null) {
      return res.json({ message: "USUARIO NO ENCONTRADO" });
    } else {
      return res.json(usuarios);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarios = usuarioM.findOne({
      where: { id },
    });
    if (usuarios == null) {
      return res.json({ message: "usuarioM NO ENCONTRADO" });
    } else {
      usuarios.set(req.body);
      await usuarios.save();
      return res.json(usuario);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    console.log("SI ENTRO XD");
    const { usuario, contrasenia } = req.body;
    console.log("usuario ", usuario, "\tcontraseña ", contrasenia);
    const usuarios = await usuarioM.findOne({
      where: {
        usuario,
        contrasenia,
      },
    });
    if (usuarios == null) {
      console.log(" ES NULL");
      return res.status(500).json({ message: "ERROR NO INICIA" });
    } else {
      console.log("NO ES NULL");
      return res.json(usuarios);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
