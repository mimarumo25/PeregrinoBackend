import pkg from 'mongoose';
const { Schema, model } = pkg;

export const Estado =['Salida Domiciliaria','Salida Parcial']
const tipoSalidaSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model("TipoSalida", tipoSalidaSchema)