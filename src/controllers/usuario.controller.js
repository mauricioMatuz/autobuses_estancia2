import { usuarioM } from "../models/usuario.models.js";
import { Rol } from "../models/rol.models.js";
import jwt from "jsonwebtoken";

export const verUsuarios = async (req, res, next) => {
  try {
    const usuario = await usuarioM.findAll({
      include: [
        {
          model: Rol,
        },
      ],
      attributes: ["id", "nombre", "usuario", "correo", "contrasenia", "rolID"],
    });
    const tokensito = verifyToken(req, res, next);
    const purueba = jwt.verify(tokensito, "administrador", (error) => {
      if (error) {
        return res.status(403).json({ message: "ERROR TOKEN" });
      } else {
        return res.status(200).json({ usuario });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error servidor", error: error.json });
  }
};

export const verClientes = async (req, res, next) => {
  try {
    const usuario = await usuarioM.findAll({
      include: {
        model: Rol,
      },
      where: {
        rolID: 3,
      },
      attributes: ["id", "nombre", "usuario", "correo", "contrasenia", "rolID"],
    });
    const tokensito = verifyToken(req, res, next);
    const purueba = jwt.verify(tokensito, "vendedor", (error) => {
      if (error) {
        return res.status(403).json({ message: "ERROR TOKEN" });
      } else {
        return res.status(200).json({ usuario });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error servidor", error: error.json });
  }
};

export const crearRoot = async (req, res) => {
  try {
    const { nombre, usuario, correo, contrasenia, rol } = req.body;
    const usuarios = await usuarioM.create({
      nombre,
      usuario,
      correo,
      contrasenia,
      rolID: 1,
    });
    return res.json({ usuario });
  } catch (error) {
    console.log(error, " ERROR XD");
  }
};
// para resubir
export const registrar = async (req, res) => {
  try {
    const { nombre, usuario, correo, contrasenia, rol } = req.body;
    var bandera = false
    let rolID;
    if (rol == "Vendedor" || rol == "vendedor") {
      rolID = 2;
      bandera = true
    }
    if (rol == "Administrador" || rol == "administrador") {
      rolID = 1;
      bandera = true
    }

    const tokensito = verifyToken(req, res);
    if (tokensito == 0 && !bandera) {
      const usuarios = await usuarioM.create({
        nombre,
        usuario,
        correo,
        contrasenia,
        rolID: 3,
      });
      return res.status(201).json({ token: "cliente" });
    } else {
      let prueba = await jwt.verify(tokensito, "administrador", (error) => {
        if (error) {
          return res.status(403).json({ message: "ERROR TOKEN" });
        } else {
          const usuarios = usuarioM.create({
            nombre,
            usuario,
            correo,
            contrasenia,
            rolID,
          });
          return res.status(200).json({ message: "Registrado" });
        }
      });
    }
  } catch (error) {
    if (error["original"] != null) {
      return res.status(200).json({
        status: false,
        message: `Usuario ya creado`,
      });
    }
    return res.status(200).json({
      status: false,
      message: `Error en el proceso de registro`,
    });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const tokensito = verifyToken(req, res);
    const usuarios = await usuarioM.findOne({
      where: { id },
      attributes: ["id", "nombre", "usuario", "correo", "contrasenia", "rolID"],
    });
    if (usuarios == null) {
      return res.status(204).json({ message: "NO SE ENCONTRO" });
    } else {
      if (tokensito == 0 && usuarios["rolID"] == 3) {
        const usuarios = await usuarioM.destroy({
          where: { id },
        });
        return res.json({ message: "cuenta eliminado" });
      } else {
        await jwt.verify(tokensito, "administrador", (error) => {
          if (error) {
            return res.status(403).json({ message: "ERROR TOKEN" });
          } else {
            const usuarios =  usuarioM.destroy({
              where: { id },
            });
            return res.status(200).json({ message: "Eliminado" });
          }
        });
        
      }
    }
  } catch (error) {
    console.log("error ", error);
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
    const tokensito = verifyToken(req, res, next);
    jwt.verify(tokensito, "secretkey", (error) => {
      if (error) {
        return res.status(403).json({ message: "ERROR TOKEN" });
      } else {
        if (usuarios == null) {
          return res.json({ message: "USUARIO NO ENCONTRADO" });
        } else {
          return res.status(200).json({ usuarios });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id, nombre, usuario, correo, contrasenia } = req.body;

    const usuarios = await usuarioM.findOne({
      where: { id },
      attributes: ["nombre", "usuario", "correo", "contrasenia", "rolID"],
    });
    const tokensito = verifyToken(req, res, next);
    console.log(usuarios["rolID"], " usuario");
    if (tokensito == 0 && usuarios["rolID"] == 3) {
      usuarios.set(req.body);
      await usuarios.save();
      return res.status(204).json({ message: "Actualizado" });
    } else {
      const prueba = await jwt.verify(tokensito, "administrador", (error) => {
        if (error) {
          return res.status(403).json({ message: "ERROR TOKEN" });
        } else {
          usuarios.set(req.body);
          usuarios.save();
          return res.status(200).json({ message: "Actualizado" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { usuario, contrasenia } = req.body;
    const usuarios = await usuarioM.findOne({
      where: {
        usuario,
        contrasenia,
      },
      attributes: ["nombre", "usuario", "correo", "contrasenia", "rolID"],
    });

    if (usuarios == null) {
      return res
        .status(200)
        .json({ status: false, message: "Error al iniciar sesion" });
    } else {
      if (usuarios.rolID == 3) {
        return res.status(202).json({ rol: "cliente" });
      }
      if (usuarios.rolID == 2) {
        jwt.sign({ user: usuarios }, "vendedor", (err, token) => {
          return res.status(202).json({ token: token, rol: "vendedor" });
        });
      }
      if (usuarios.rolID == 1) {
        jwt.sign({ user: usuarios }, "administrador", (err, token) => {
          return res.json({ token: token, rol: "administrador" });
        });
        // jwt.sign({ user: usuarios }, "secretkey", (err, token) => {
        //   res.json({
        //     token: token,
        //   });
        // });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verificar = async (req, res) => {
  const { usuario } = req.params;
  const usuarios = await usuarioM.findOne({
    where: {
      usuario,
    },
  });

  if (usuarios != null) {
    return res.status(200).json({ message: "USUARIO YA EN USO" });
  } else {
    return res.status(200).json({ message: "USUARIO DISPONIBLE" });
  }
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
