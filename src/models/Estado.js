import pkg from 'mongoose';
const { Schema, model } = pkg;

export const Estado =['activo','inactivo']
const estadoSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model("Estado", estadoSchema)