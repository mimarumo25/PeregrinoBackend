import Estado from "../models/Estado.js";
import Recluso from "../models/Recluso.js"

export const createRecluso = async (req, res) => {

    try {
        const { cedula, nombres, apellidos, nit, celda, patio } = req.body;
        const estado = await Estado.findOne({ name: "activo" })   
        const newRecluso = new Recluso({ cedula, nombres, apellidos, nit, celda, patio });
        newRecluso.estado = [estado._id]
        const reclusoSave = await newRecluso.save();
        res.status(200).json({ reclusoSave, mesaje: "Recluso Creado Exitoso" });
    } catch (error) {
        res.status(500).json({ mesaje: "Error al crear el Recluso" })
    }

}
export const getRecluso = async (req, res) => {

    const desde = Number( req.query.desde ) || 0;

    try {
        const getrecluso = await Recluso.find()
            .skip( desde )
            .limit( 50 );
        
        const total = await Recluso.countDocuments();

        res.json({
            ok: true,
            reclusos: getrecluso,
            total
        });

    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({ mensaje: "error al recuparar el recluso" })
    }

}
export const getReclusoById = async (req, res) => {
    try {
        const reclusoId = await Recluso.findById(req.params.reclusoId)
        res.json(reclusoId);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: "error al recupaerar el recluso" })
    }
}
export const updateReclusoById = async (req, res) => {
    try {
        const update = await Recluso.findByIdAndUpdate(req.params.reclusoId, req.body, { new: true })
        res.json({ mensaje: "Recluso Actualizado Exitosamente", update });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error al actualizar  el recluso" })
    }

}
export const deleteReclusoById = async (req, res) => {
    try {
        const { reclusoId } = req.params;
        const deleteId = await Recluso.findByIdAndDelete(reclusoId)
        if (!deleteId) return res.status(401).json({ mensaje: "Recluso no existe" })
        return res.json({ mensaje: "Recluso Eliminado Correctamente " })
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al Eliminar la Salida del Recluso" })
    }
}