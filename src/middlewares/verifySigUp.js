
import { Roles } from '../models/Role.js'
import User from '../models/User.js';

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!Roles.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `role ${req.body.roles[i]} does not exists`
                })
            }

        }
    }
    next();
}
export const checkDuplicateUsernameOrEmail = async(req, res, next)=>{
    const user = await User.findOne({telefono: req.body.telefono});   
    if (user)return res.status(400).json({message: 'El telefono ya se encuentra registrado'})
    const email = await User.findOne({email: req.body.email});
    if (email)return res.status(400).json({message: 'El email ya se encuentra registrado'})
    next();
}