import EstadoMatricula from "../models/EstadoMatricula.js";
import Matriculas from "../models/Matriculas.js";
import Recluso from "../models/Recluso.js";
import SalidaRecluso from "../models/SalidaRecluso.js";


export const getTotales = async(req, res) =>{
 const matricula = await Matriculas.countDocuments();
 const recluso = await Recluso.countDocuments();
 const salida = await SalidaRecluso.countDocuments();
 const estadoM = await EstadoMatricula.findOne({ name: "Finalizado" })
 const stado = [estadoM._id]
const buscaMatriFinalizada = await Matriculas.find({ estado: { $in: stado} })
const graduado =buscaMatriFinalizada.length;
 res.json({matricula,recluso,salida,graduado})
}