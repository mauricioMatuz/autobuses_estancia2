import { Router } from "express";
import cors from "cors";
import { registrarBoleto } from "../controllers/boletos.controller.js";
const router = Router();


export default router;
router.post("/api/boleto",cors(),registrarBoleto)
// para resubir