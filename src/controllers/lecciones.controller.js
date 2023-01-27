import Lecciones from "../models/Lecciones.js";
import Programa from "../models/Programa.js";

export const createLecciones = async (req, res) => {
    try {
        const { nombre, programa, nivel,descripcion } = req.body
        const newLecciones = new Lecciones({ nombre, programa, nivel,descripcion })
        const buscaPrograma = await Programa.find({ nombre: { $in: programa } })
        newLecciones.programa = buscaPrograma.map(programa => programa._id)
        console.log(newLecciones);
        const leccionesSave = await newLecciones.save();
        res.status(200).json({ leccionesSave, mesaje: "Lección Creada Exitosamente" })
    } catch (error) {
        res.status(500).json({ mesaje: "Error al crear la Lecciones" })
    }

}
export const getLecciones = async (req, res) => {
    const desde = Number( req.query.desde ) || 0;

    try {
        const lecciones = await Lecciones.find()
            .populate('programa',{nombre:1, _id:0})
            .skip( desde )
            .limit( 50 );

        const total = await Lecciones.countDocuments();

        res.json({
            ok: true,
            lecciones,
            total
        })
    } catch (error) {
        res.status(400).json({ mensaje: "error al recupaerar las Lecciones" })
    }
}
export const getLeccionesById = async (req, res) => {
    try {
        const lecciones = await Lecciones.findById(req.params.leccionId)
        res.json(lecciones);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: "error al recupaerar la Leccion" })
    }
}
export const updateLeccionesById = async (req, res) => {
    try {
        const { nombre, programa, nivel,descripcion } = req.body
        const buscaPrograma = await Programa.find({ nombre: { $in: programa } })
        const programaB= buscaPrograma.map(programa => programa._id)
        const update = await Lecciones.findByIdAndUpdate(req.params.leccionId,{nombre,programa:programaB,nivel,descripcion}, { new: true })
        res.json({ mensaje: "Leccion Actualizado Exitosamente", update });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error al actualizar  la Leccion" })
    }

}
export const deleteLeccionesById = async (req, res) => {
    try {
        const { leccionId } = req.params;
        const deleteId = await Lecciones.findByIdAndDelete(leccionId)
        if (!deleteId) return res.status(401).json({ mensaje: "Leccion no existe" })
        return res.json({ mensaje: "Leccion Eliminada Correctamente " })
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al Eliminar la leccion" })
    }
}