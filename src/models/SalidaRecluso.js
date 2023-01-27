import pkg from 'mongoose';
const { Schema, model } = pkg;


const SalidaSchema = new Schema({
    recluso: [
        {
            ref: "Recluso",
            type: Schema.Types.ObjectId //Relaciona con la tabla Estado toma el id 
        }
    ],
    telefono:String,
    direccion: String,
    fechaSalida: String,
    salida:[
        {
            ref: "TipoSalida",
            type: Schema.Types.ObjectId //Relaciona con la tabla Estado toma el id 
        }
    ],
    
    observacion: String
}, {
    timestamps: true,
    versionKey: false
})

export default model("SalidaRecluso", SalidaSchema)