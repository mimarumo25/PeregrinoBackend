import EstadoMatricula from "../models/EstadoMatricula.js";
import Role from "../models/Role.js";
import TipoSalida from "../models/TipoSalida.js";

export const getRoles = async(req, res) => {
    const roles = await Role.find();
    res.json(roles)
  
  }
  export const getEstadoMatricula = async(req, res) => {
    const estadoMatricula = await EstadoMatricula.find();
    res.json(estadoMatricula)
  
  }
  export const getTipoSalida = async(req, res) => {
    const tipoSalida = await TipoSalida.find();
    res.json(tipoSalida)  
  }