import { Router } from "express";
import cors from "cors";
import {
  actualizarUsuario,
  borrarUsuario,
  buscarUsuario,
  registrar,
  verUsuarios,
  iniciarSesion,
  verificar,
  verClientes,
  crearRoot,
} from "../controllers/usuario.controller.js";

const router = Router();
router.post("/api/root", cors(), crearRoot);
router.get("/api/usuario", cors(), verUsuarios);
router.get("/api/cliente", cors(), verClientes);
router.post("/api/registrar/usuario", cors(), registrar);
router.post("/api/registrar/vendedor", cors(), registrar);
router.delete("/api/eliminar/usuario", cors(), borrarUsuario);
router.put("/api/actualizar/usuario", cors(), actualizarUsuario);
router.post("/api/buscar/usuario", cors(), buscarUsuario);
router.post("/api/iniciar", cors(), iniciarSesion);
router.post("/api/validar/:usuario", cors(), verificar);
export default router;
//! VALIDAR USUARIO O BUSCAR USUARIO POR (VALORES QUE TIENE EXCEPTUANDO PASSWORD )
