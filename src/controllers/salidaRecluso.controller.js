import SalidaRecluso from "../models/SalidaRecluso.js";



export const createSalidaRecluso = async (req, res) => {
    try {
        const { recluso, telefono, direccion, fechaSalida, salida, observacion } = req.body;
        const newSalidaRecluso = new SalidaRecluso({ recluso, telefono, direccion, fechaSalida, salida, observacion });
        const salidaReclusoSave = await newSalidaRecluso.save();
        res.status(200).json({ salidaReclusoSave, mesaje: "Salida del Recluso Creado Exitosamente" });
    } catch (error) {
        res.status(500).json({ mesaje: "Error al Crear la Salida del Recluso" })
    }
}
export const getSalidaRecluso = async (req, res) => {
    try {
        const salidasReclusos = await SalidaRecluso.find().populate("recluso").populate("salida")
        res.json(salidasReclusos);
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({ mensaje: "error al extrar las salidas de los reclusos" })

    }
}
export const getSalidaReclusoById = async (req, res) => {

    try {
        const salidasRecluso = await SalidaRecluso.findById(req.params.salidaReclusoId).populate("recluso").populate("salida")
        res.json(salidasRecluso);
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({ mensaje: "Error al extrar la salida del recluso : " + req.params.salidaReclusoId })
    }
}
export const updateSalidaReclusoById = async (req, res) => {
    try {
        const update = await SalidaRecluso.findByIdAndUpdate(req.params.salidaReclusoId, req.body, { new: true })
        res.json({ mensaje: "Salidas del Reclusos Actualizado Exitosamente", update });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al Actualizar  La Salida del Recluso" })
    }
}
export const deleteSalidaReclusoById = async(req, res) => {
    try {
     
        const deleteId = await SalidaRecluso.findByIdAndDelete(req.params.salidaReclusoId)
        if (!deleteId) return res.status(401).json({ mensaje: "La Salida del Recluso no existe" })
        return res.json({ mensaje: "Salida del Recluso Eliminado Correctamente " })
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al Eliminar el Recluso" })
    }
}