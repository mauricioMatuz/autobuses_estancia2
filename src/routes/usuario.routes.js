import { Router } from "express";
import cors from "cors";
import {
  actualizarUsuario,
  borrarUsuario,
  buscarUsuario,
  registrar,
  verUsuarios,
  iniciarSesion,
} from "../controllers/usuario.controller.js";

const router = Router();
/**
 *@swagger
 *  components:
 *    schemas:
 *      Usuario:
 *        type: object
 *        properties:
 *          nombre:
 *            type: string
 *            description: el nombre de usuario
 *          correo:
 *            type: string
 *            description: el correo del usuario
 *          contrasenia:
 *            type: string
 *            description: contraseña del usuario
 *          usuario:
 *            type: string
 *            description: usuario
 *        required:
 *          - nombre
 *          - correo
 *          - contrasenia
 *          - usuario
 *        example:
 *          nombre: mauricio matuz
 *          correo: killashe96@gmail.com
 *          contrasenia: 1234
 *          usuario: maumatuz
 */
router.get("/api/usuario", cors(), verUsuarios);
router.post("/api/registrar/usuario", cors(), registrar);
router.delete("/api/eliminar/usuario/:id", cors(), borrarUsuario);
router.put("/api/actualizar/usuario/:id", cors(), actualizarUsuario);
router.get("/api/buscar/usuario/:id", cors(), buscarUsuario);
router.post("/api/iniciar", cors(), iniciarSesion);
export default router;
