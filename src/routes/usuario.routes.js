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
router.get("/api/usuario", cors(), verUsuarios);
router.post("/api/registrar/usuario", cors(), registrar);
router.delete("/api/eliminar/usuario", cors(), borrarUsuario);
router.put("/api/actualizar/usuario", cors(), actualizarUsuario);
router.post("/api/buscar/usuario", cors(), buscarUsuario);
router.get("/api/iniciar", cors(), iniciarSesion);
export default router;
