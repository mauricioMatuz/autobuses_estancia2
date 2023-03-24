import { Router } from "express";
import cors from "cors";
import {
  actualizarMaleta,
  crearMaletas,
  eliminarMaleta,
  verMaletas,
} from "../controllers/maletas.controller.js";

const router = Router();

router.get("/api/maleta", cors(), verMaletas);
router.post("/api/registrar/maleta", cors(), crearMaletas);
router.delete("/api/eliminar/maleta", cors(), eliminarMaleta);
router.put("/api/actualizar/maleta/:folio", cors(), actualizarMaleta);

export default router;
// para resubir
