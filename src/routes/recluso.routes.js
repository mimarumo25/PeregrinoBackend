import express from "express";
import { getDocumentosCollecion } from "../controllers/busqueda.controller.js";
import { createRecluso, deleteReclusoById, getRecluso, getReclusoById, updateReclusoById } from '../controllers/recluso.controller.js'
import { verfyToken } from "../middlewares/authJwt.js";
import { ValidarCedulaoNitRecluso, ValidarCedulaoNitReclusoUpdate } from "../middlewares/utilidades.js";



const router = express.Router();

router.post('/create', [verfyToken, ValidarCedulaoNitRecluso], createRecluso)
router.get('/', getRecluso)

router.get('/:tabla/:busqueda', verfyToken, getDocumentosCollecion );

router.get('/:reclusoId', getReclusoById)
router.put('/:reclusoId', [verfyToken, ValidarCedulaoNitReclusoUpdate], updateReclusoById)
router.delete('/:reclusoId', [verfyToken], deleteReclusoById)


export default router