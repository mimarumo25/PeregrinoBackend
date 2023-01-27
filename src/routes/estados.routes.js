import { Router } from "express";
import {getEstadoMatricula, getRoles,getTipoSalida} from "../controllers/estados.controller.js"



const router = Router();




//router.post('/create',[verfyToken,isAdmin,verifySignup.checkRolesExisted],createUser)
router.get("/roles", getRoles)
router.get('/estadoMatricula',getEstadoMatricula)
router.get('/tiposalida',getTipoSalida)

export default router