/* 
    Ruta: api/todo/:busqueda
*/

import { Router } from "express";
import { getDocumentosCollecion } from "../controllers/busqueda.controller.js";
import { verfyToken } from "../middlewares/authJwt.js";

// const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

// router.get('/:busqueda', validarJWT, getTodo );

router.get('/:tabla/:busqueda', verfyToken, getDocumentosCollecion );

export default router;