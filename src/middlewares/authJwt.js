import jwt from "jsonwebtoken";
import User from "../models/User.js"
import Role from "../models/Role.js"
import config from "../config.js"

export const verfyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(501).json({ mesage: "No token provided" })

        const decode = jwt.verify(token, config.SECRET)
        req.userId = decode.id;
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "No user found" })
        next();
    } catch (error) {
        console.log("error al validar el token" + error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(401).json({ message: "require moderator role" })
}

export const isAdmin = async (req, res, next) => {
    try {            
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(401).json({ message: "require admin role" })
} catch (error) {
    return res.status(500).json({ message: "Error al validar el rol" })     
}
}