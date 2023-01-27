import { Router } from "express";
import { createLecciones, deleteLeccionesById, getLecciones, getLeccionesById, updateLeccionesById } from "../controllers/lecciones.controller.js";
import { verfyToken,isAdmin } from "../middlewares/authJwt.js";
import { ValidaPrograma, ValidarNivel} from "../middlewares/utilidades.js";



const router = Router();
router.post('/create', [verfyToken,isAdmin, ValidaPrograma, ValidarNivel], createLecciones)
router.get('/', getLecciones)
router.get('/:leccionId', getLeccionesById)
router.put('/:leccionId', [verfyToken], updateLeccionesById)
router.delete('/:leccionId', [verfyToken], deleteLeccionesById)

export default router