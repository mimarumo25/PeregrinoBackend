import Recluso from "../models/Recluso.js";
import Programa from "../models/Programa.js";
import Lecciones from "../models/Lecciones.js";
import Matriculas from "../models/Matriculas.js";


export const ValidarCedulaoNitRecluso = async (req, res, next) => {
    try {
        const reclusoV = await Recluso.findOne({ cedula: req.body.cedula });
        if (reclusoV) return res.status(400).json({ message: 'La Cédula del recluso ya se encuentra registrado' })
        const nit = await Recluso.findOne({ nit: req.body.nit });
        if (nit) return res.status(400).json({ message: 'El Cédula del recluso ya se encuentra registrado' })
        next();
    } catch (error) {
        console.log("Error de validacion :" + error);
        res.status(400).json({ message: 'Error de validacion de Datos duplicados', error: error })
    }
}
export const ValidarCedulaoNitReclusoUpdate = async (req, res, next) => {
    try {
        const reclusoV = await Recluso.find({ cedula: req.body.cedula });
        if (reclusoV.length > 1) return res.status(400).json({ message: 'La Cédula del recluso ya se encuentra registrado' })
        const nit = await Recluso.find({ nit: req.body.nit });
        if (nit.length > 1) return res.status(400).json({ message: 'El Cédula del recluso ya se encuentra registrado' })
        next();
    } catch (error) {
        console.log("Error de validacion :" + error);
        res.status(400).json({ message: 'Error de validacion de Datos duplicados', error: error })
    }
}
export const ValidaPrograma = async (req, res, next) => {
    if (req.body.programa) {
        const programa = await Programa.find({ nombre: req.body.programa })
        if (!programa.length) return res.status(400).json({ message: `Progama ${req.body.programa} No existe` })
        next();
    }
}

export const ValidarNivel = async (req, res, next) => {
    try {
        const programa = await Programa.find({ nombre: req.body.programa })
        const idPrograma = programa.map(p => p._id)
        const nivel = await Lecciones.find({ $and: [{ nivel: req.body.nivel }, { programa: idPrograma }] });
        if (nivel.length) return res.status(400).json({ message: 'Ya existe una lección para este nivel' })
        next();
    } catch (error) {
        console.log("Error de validacion :" + error);
        res.status(400).json({ message: 'Error de validacion de niveles duplicados', error: error })
    }
}
export const ValidarMatriculaLeccion = async (req, res, next) => {

    try {
        const { leccion, cedula } = req.body
        const buscaRecluso = await Recluso.find({ cedula: { $in: cedula } })
        if (!buscaRecluso.length) return res.status(400).json({ message: 'Recluso al que intenta matricular no existe' })
        const idRecluso = buscaRecluso.map(recluso => recluso._id)

        const buscaLeccion = await Lecciones.find({ nombre: { $in: leccion } })
        if (!buscaLeccion.length) return res.status(400).json({ message: 'La lección que intenta matricular no existe' })
        const idLeccion = buscaLeccion.map(lecc => lecc._id)
        const matricula = await Matriculas.find({ $and: [{ recluso: idRecluso }, { leccion: idLeccion }] });
        if (matricula.length) return res.status(400).json({ message: 'Este recluso ya se encuentra matriculado en esa Lección' })
        next();
    } catch (error) {
        console.log("Error de validacion :" + error);
        res.status(400).json({ message: 'Error de validacion de Matriculas duplicadas', error: error })
    }
}
