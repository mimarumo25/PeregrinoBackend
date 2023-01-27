import { Router } from "express";
import {createUser, getUserById, getUsers,updateUserById, updateUserDatosById, updateUserPassById,deleteUserById} from "../controllers/user.controller.js"
import {checkRolesExisted, checkDuplicateUsernameOrEmail} from '../middlewares/verifySigUp.js'
import {isAdmin, verfyToken} from '../middlewares/authJwt.js'


const router = Router();



router.post('/create',[verfyToken,isAdmin,checkRolesExisted, checkDuplicateUsernameOrEmail],createUser)
router.get("/", getUsers)
router.get('/:userId',getUserById)
router.put('/:userId', [verfyToken,checkRolesExisted], updateUserById)
router.put('/datos/:userId', [verfyToken], updateUserDatosById)
router.put('/pass/:userId', [verfyToken], updateUserPassById)
router.delete('/:userId', [verfyToken], deleteUserById)


export default router