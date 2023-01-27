import express from "express";
import { createSalidaRecluso, deleteSalidaReclusoById, getSalidaRecluso, getSalidaReclusoById, updateSalidaReclusoById } from "../controllers/salidaRecluso.controller.js";
import { verfyToken } from "../middlewares/authJwt.js";

const router = express.Router();

router.post('/create', [verfyToken], createSalidaRecluso)
router.get('/', getSalidaRecluso)
router.get('/:salidaReclusoId',getSalidaReclusoById)
router.put('/:salidaReclusoId', [verfyToken, ], updateSalidaReclusoById)
router.delete('/:salidaReclusoId', [verfyToken], deleteSalidaReclusoById)


export default router