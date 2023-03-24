import { Router } from "express";
import cors from "cors";
import {
  actualizarAutobus,
  borrarAutobus,
  buscarAutobus,
  getAutobus,
  registrarAutobus,
} from "../controllers/autobus.controller.js";



const router = Router();
router.get("/api/autobus", cors(), getAutobus);
router.post("/api/autobus/register", cors(), registrarAutobus);
router.put("/api/autobus/actualizar", cors(), actualizarAutobus);
router.delete("/api/autobus/borrar", cors(), borrarAutobus);
router.get("/api/autobus/buscar", cors(), buscarAutobus);

export default router; //
