import { Router } from "express";
import cors from "cors";
import {
  actualizarUsuario,
  borrarUsuario,
  buscarUsuario,
  registrar,
  verUsuarios,
} from "../controllers/usuario.controller.js";

const router = Router();

router.get("/api/usuario", cors(), verUsuarios);
router.post("/api/registrar/usuario", cors(), registrar);
router.delete("/api/eliminar/usuario/:id", cors(), borrarUsuario);
router.put("/api/actualizar/usuario/:id", cors(), actualizarUsuario);
router.get("/api/buscar/usuario/:id", cors(), buscarUsuario);
export default router;
