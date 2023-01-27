import { Router } from "express";
import {getFiles, upFiles,uploaded} from "../controllers/files.controller.js"



const router = Router();

router.get('/getArchivos',getFiles)
router.post('/creatArchivo',uploaded,upFiles)

export default router