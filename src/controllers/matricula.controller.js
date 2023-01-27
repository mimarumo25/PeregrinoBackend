import EstadoMatricula from '../models/EstadoMatricula.js'
import Lecciones from '../models/Lecciones.js'
import Matriculas from '../models/Matriculas.js'
import Recluso from '../models/Recluso.js'


export const createMatricula = async (req, res) => {
    try {
        const { cedula, leccion, estadoId } = req.body
        const newMatricula = new Matriculas({ recluso: cedula, leccion, estado: estadoId })

        const buscaRecluso = await Recluso.find({ cedula: { $in: cedula } })
        newMatricula.recluso = buscaRecluso.map(recluso => recluso._id)

        const buscaLeccion = await Lecciones.find({ nombre: { $in: leccion } })
        newMatricula.leccion = buscaLeccion.map(leccion => leccion._id)
        const estadoM = await EstadoMatricula.findOne({ name: "En Curso" })
        newMatricula.estado = [estadoM._id]
        const matriculaSave = await newMatricula.save();

        res.status(200).json({ matriculaSave, mesaje: "El recluso se ha matriculado exitosamente a la lección " + leccion })
    } catch (error) {
        res.status(500).json({ mesaje: "Error al realizar la Matricula del recluso" })
    }

}
export const getMatricualasFinalizadas = async (req, res) => {
    try {
        const estadoM = await EstadoMatricula.findOne({ name: "Finalizado" })
        const stado = [estadoM._id]
        const buscaMatriFinalizada = await Matriculas.find({ estado: { $in: stado } })
            .populate('recluso')
            .populate({
                path: 'leccion',
                populate: { path: 'programa' }
            })
            .populate('estado');
        res.json(buscaMatriFinalizada)
        /*   const matriculas = await Matriculas.find()
               .populate('recluso')
               .populate({
                   path: 'leccion',
                   populate: { path: 'programa' }
               })
               .populate('estado');
   
           res.status(200).json(matriculas)*/
    } catch (error) {
        res.status(400).json({ mensaje: "error al recupaerar las matriculas" })
    }
}
export const getMatricualas = async (req, res) => {
    try {
        const matriculas = await Matriculas.find()
            .populate('recluso')
            .populate({
                path: 'leccion',
                populate: { path: 'programa' }
            })
            .populate('estado');

        res.status(200).json(matriculas)
    } catch (error) {
        res.status(400).json({ mensaje: "error al recupaerar las matriculas" })
    }
}
export const updateMatriculaById = async (req, res) => {
    try {
        const { cedula, leccion, estado: estadoId } = req.body
        const updateMatricula = new Matriculas({ recluso: cedula, leccion, estado: estadoId });

        const buscaRecluso = await Recluso.find({ cedula: { $in: cedula } });
        updateMatricula.recluso = buscaRecluso.map(recluso => recluso._id);

        const buscaLeccion = await Lecciones.find({ nombre: { $in: leccion } })
        updateMatricula.leccion = buscaLeccion.map(leccion => leccion._id)

        console.log('UPDATE MATRICULA', updateMatricula);
        console.log('UPDATE PARAMS', req.params.matriculaId);
        let { recluso, leccion: newLeccion, estado } = updateMatricula;

        await Matriculas.findByIdAndUpdate(req.params.matriculaId, { recluso, leccion: newLeccion, estado }, { new: true });

        res.json({ mensaje: "Matricula Actualizada Exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error al actualizar  la Matricula" })
    }

}
export const deleteMatriculaById = async (req, res) => {
    try {
        const { matriculaId } = req.params;
        const deleteId = await Matriculas.findByIdAndDelete(matriculaId)
        if (!deleteId) return res.status(401).json({ mensaje: "Matricula no existe" })
        return res.json({ mensaje: "Matriculas Eliminada Correctamente " })
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al Eliminar la Matricula" })
    }
}