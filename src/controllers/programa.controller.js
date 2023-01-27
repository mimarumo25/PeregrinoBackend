import Programa from "../models/Programa.js";

export const createPrograma = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body
        const newPrograma = new Programa({ nombre, descripcion })
        const programaSave = await newPrograma.save();
        res.status(200).json({ programaSave, mesaje: "Recluso Creado Exitoso" })
    } catch (error) {
        res.status(500).json({ mesaje: "Error al crear el Recluso" })
    }

}
export const getPrograma = async (req, res) => {

    const desde = Number( req.query.desde ) || 0;

    try {
        const programas = await Programa.find()
            .skip( desde )
            .limit( 50 );
        
        const total = await Programa.countDocuments();

        res.json({
            ok: true,
            programas,
            total
        });
        
    } catch (error) {
        res.status(400).json({ mensaje: "error al recupaerar los Programas" }) 
    }


}
export const getProgramaById = async (req, res) => {
    try {
        const programa = await Programa.findById(req.params.programaId)
        res.json(programa);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: "error al recupaerar el Programa" })
    }
}
export const updateProgramaById = async (req, res) => {
    try {
        const update = await Programa.findByIdAndUpdate(req.params.programaId, req.body, { new: true })
        res.json({ mensaje: "Programa Actualizado Exitosamente", update });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error al actualizar  el Programa" })
    }

}
export const deleteProgramaById = async (req, res) => {
    try {
        const { programaId } = req.params;
        const deleteId = await Programa.findByIdAndDelete(programaId)
        if (!deleteId) return res.status(401).json({ mensaje: "Programa no existe" })
        return res.json({ mensaje: "Programa Eliminado Correctamente " })
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al Eliminar el Programa" })
    }
}