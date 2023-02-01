import { Router } from "express";
import {
  getBoletos,
  createBoletos,
  deleteBoleto,
  updateBoleto,
  getOneBoleto,
  buscarMaleta,
} from "../controllers/boletos.controller.js";
import cors from "cors";
const router = Router();

router.get("/api/boleto", cors(), getBoletos);
router.post("/api/registrar/boleto", cors(), createBoletos);
router.delete("/api/eliminar/boleto", cors(), deleteBoleto);
router.put("/api/actualizar/boleto", cors(), updateBoleto);
router.get("/api/buscar/:folio", cors(), getOneBoleto);
router.get("/api/buscar/maleta/:folio", cors(), buscarMaleta);
export default router;
// para resubir