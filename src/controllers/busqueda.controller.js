import Lecciones from "../models/Lecciones.js";
import Programa from "../models/Programa.js";
import Recluso from "../models/Recluso.js";
import User from "../models/User.js";

export const getDocumentosCollecion = async ( req, res ) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'reclusos':
            data = await Recluso.find({ cedula: regex });
        break;
        case 'lecciones':
            data = await Lecciones.find({ nombre: regex });
        break;
        case 'usuarios':
            data = await User.find({ nombre: regex });
        break;
        case 'programas':
            data = await Programa.find({ nombre: regex });
        break;
        default:
            return res.status(400).json({ mensaje: "La tabla tiene que ser reclusos/lecciones" })
    }

    if ( data.length <= 0 ) {
        res.status(400).json({ mensaje: `No se encontraron ${ tabla } por: "${ busqueda }"` });
        return;
    }

    res.status(200).json( data );
}