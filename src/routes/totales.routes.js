import { Router } from "express";
import {getTotales} from "../controllers/totales.controller.js"

const router = Router();

router.get("/", getTotales)

export default router