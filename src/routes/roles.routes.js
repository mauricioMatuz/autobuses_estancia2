import { Router } from "express";
import cors from "cors";
import { eliminarRol, getRol, registrarRol } from "../controllers/rol.controller.js";

const router = Router();
router.get('/api/rol',cors(),getRol)
router.post("/api/registrar/rol", cors(), registrarRol);
router.delete("api/eliminar/rol", cors(), eliminarRol);
export default router;
 