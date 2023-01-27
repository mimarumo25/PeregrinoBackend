import { Router } from "express";
import { createPrograma, deleteProgramaById, getPrograma, getProgramaById, updateProgramaById } from '../controllers/programa.controller.js'
import {  verfyToken, isAdmin } from "../middlewares/authJwt.js";



const router = Router();

router.post('/create', [verfyToken,isAdmin], createPrograma)
router.get('/', getPrograma)
router.get('/:programaId', getProgramaById)
router.put('/:programaId', [verfyToken], updateProgramaById)
router.delete('/:programaId', [verfyToken], deleteProgramaById)

export default router