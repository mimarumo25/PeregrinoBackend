import User from "../models/User.js"
import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Role.js";

export const signUp = async (req, res) => {
    //const userFound = User.find(email)
    const { username, email, password, roles } = req.body;
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    //validamos si se envio los roles y consultamos si exite y carga todos los roles al nuevo usuario
    if (roles) {
        const fountRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = fountRoles.map(role => role._id)
    }//si no se envia un rol por defecto carga el rol de user
    else {
        const role = await Role.findOne({ name: "user" })
        newUser.roles = [role._id]
    }
    const saveUser = await newUser.save();

    const token = jwt.sign({ id: saveUser.id }, config.SECRET, {
        expiresIn: 86400 // expria en 24 horas
    })
    res.json({ token })
}
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFout = await User.findOne({ email: email }).populate("roles");
        if (!userFout) return res.status(401).json({ message: "User not found" })

        const matchPassword = await User.comparePasword(password, userFout.password) //conapramos las contraseñas 
        if (!matchPassword) return res.status(401).json({ token: null, message: 'User o password invalid' })
        const token = jwt.sign({ id: userFout.id }, config.SECRET, {
            expiresIn: 86400 // expria en 24 horas
        })
        res.json({ token })
    } catch (error) {
       
        res.status(400).json({ message:"Erro en el sistema" })
    }
}