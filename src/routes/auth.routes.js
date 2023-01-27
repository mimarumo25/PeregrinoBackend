import express from "express";
import { checkDuplicateUsernameOrEmail, checkRolesExisted} from "../middlewares/verifySigUp.js";
import { signIn, signUp } from "../controllers/auth.controller.js"

const router = express.Router();

router.post('/signup', [checkDuplicateUsernameOrEmail,checkRolesExisted ], signUp)

router.post('/signin', signIn)
export default router